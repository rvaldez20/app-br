import { check, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';

import Usuario from '../models/Usuario.js';
import { generarId } from '../helpers/tokens.js';
import { emailRegistro, emailOlvidePassword } from '../helpers/email.js';


//! Formulario Login
const formularioLogin = (req, res) => {
  res.render('auth/login', {
    page: 'Iniciar Seción',
    csrfToken: req.csrfToken(),
  })
}


const autenticar = async(req, res) => {
  const {email, password} = req.body;

  // Validacion  
  await check('email').isEmail().withMessage('El Email es requerido').run(req);
  await check('password').notEmpty().withMessage('El Password es requerido').run(req);

  let arrayErrores = validationResult(req);  // arrayErrores() retorna un array con los errors
    
  // SI resultado esta no esta vacio mostramos los errores
  if(!arrayErrores.isEmpty()) {
    // hay errores de validacion
    return res.render('auth/login', {
      page: "Login",
      csrfToken: req.csrfToken(),
      errores: arrayErrores.array()
    })
  }

  // Comprobar que el usuario exista 
  const usuario = await Usuario.findOne( { where: { email }} );
  if(!usuario) {
    // el email NO existe
    return res.render('auth/login', {
      page: "Login",
      csrfToken: req.csrfToken(),
      errores: [{msg: 'El usuario no esta registrado'}]
    })
  }

  // comprobar si el usuario esta confirmado
  if(!usuario.confirmado) {
    // la cuenta no esta activada
    return res.render('auth/login', {
      page: "Login",
      csrfToken: req.csrfToken(),
      errores: [{msg: 'Tu cuenta no ha sido confirmada'}]
    })
  }

  // verificar que el password sea correcto return false(pass incorrceto) | true(pass correcto)
  if(!usuario.verificarPassword(password)){
    return res.render('auth/login', {
      page: "Login",
      csrfToken: req.csrfToken(),
      errores: [{msg: 'Los datos de acceso son incorrectos'}]
    })
  }

  // autenticar al usuario


}




//! Formulario Regsitro GET
const formularioRegistro = (req, res) => {
  // console.log(req.csrfToken());  // muestra el token para CSRF

  res.render('auth/registro', {
    page: "Crear Cuenta",
    csrfToken: req.csrfToken()
  })
}



//! Formulario Registro POST (guarda el usuario)
const registrar = async(req, res) => {
  // destructuraos la data del formulario
  const { nombre, email, password, repetir_password } = req.body;

  // Validacion
  await check('nombre').notEmpty().withMessage('Nombre es obligatorio').run(req);
  await check('email').isEmail().withMessage('Debe ser un email valido').run(req);
  await check('password').isLength({ min: 6 }).withMessage('Password debe ser de al menos 6 caractere').run(req);
  await check('repetir_password').equals(req.body.password).withMessage('Los password deben ser iguales').run(req);

  let arrayErrores = validationResult(req);  // arrayErrores() retorna un array con los errors
    
  
  // SI resultado esta no esta vacio mostramos los errores
  if(!arrayErrores.isEmpty()) {
    // hay errores de validacion
    return res.render('auth/registro', {
      page: "Crear Cuenta",
      csrfToken: req.csrfToken(),
      errores: arrayErrores.array(),
      usuario: {
        nombre,
        email
      }
    })
  }

  // verificar que el email no exista
  const existeUsuario = await Usuario.findOne( { where: { email }} );
    if(existeUsuario) {
    // el email ya existe
    return res.render('auth/registro', {
      page: "Crear Cuenta",
      csrfToken: req.csrfToken(),
      errores: [{msg: 'El email ya esta registrado'}],
      usuario: {
        nombre,
        email
      }
    })
  }

  // Si pasa todas las validacioens guardamos el nuevo usuario  
  const usuario = await Usuario.create({
    nombre,
    email,
    password,
    token: generarId()
  });

  // envia el email de confirmación de cuenta
  emailRegistro({
    nombre: usuario.nombre,
    email: usuario.email,
    token: usuario.token,
  });

  // mostrar mensaje de confirmación (vista indicando que se envio un email)
  res.render('template/mensaje', {
    page: 'Cuenta creada correctamnete',
    mensaje: 'Hemos Enviado un Email de confirmación con un mensaje para verificar tu cuenta.'
  })
}



//! Confirmar cuenta
const confirmar = async(req, res) => {
  const {token} = req.params;

  // berificar si el token es valido
  const usuario = await Usuario.findOne({ where: {token}})
  if(!usuario) {
    return res.render('auth/confirmar-cuenta', {
      page: 'Error al confirmar tu cuenta',
      mensaje: 'Hubo un error al confirmar tu cuenta, intenta de nuevo',      
      error: true
    })
  }
  
  // si es valido, se confirma la cuenta y se elimina el token
  usuario.token = null;
  usuario.confirmado = true;
  await usuario.save();

  res.render('auth/confirmar-cuenta', {
    page: 'Cuenta Confirmada',
    mensaje: 'Has confirmado tu cuenta correctamente',      
    error: false
  })
  
}



//! Formulario Olvide Password
const formularioOlvidePassword = (req, res) => {
  res.render('auth/olvide-password', {
    page: "Recupera tu Acceso a Bienes Raices",
    csrfToken: req.csrfToken(),
  })
}



//! Resetea el Password
const resetPassword = async(req, res) => {
  // destructuraos la data del formulario
  const { email } = req.body;

  // Validacion  
  await check('email').isEmail().withMessage('Debe ser un email valido').run(req);  

  let arrayErrores = validationResult(req);  // arrayErrores() retorna un array con los errors
    
  // SI resultado esta no esta vacio mostramos los errores
  if(!arrayErrores.isEmpty()) {
    // hay errores de validacion
    return res.render('auth/olvide-password', {
      page: "Recupera tu Acceso a Bienes Raices",
      csrfToken: req.csrfToken(),
      errores: arrayErrores.array()
    })
  }

  //* si es un email valido buscar el email en la DB
  const usuario = await Usuario.findOne({ where: {email}});
  // console.log(usuario)
  if(!usuario) {
    // el email NO existe
    return res.render('auth/olvide-password', {
      page: "Crear Cuenta",
      csrfToken: req.csrfToken(),
      errores: [{msg: 'El email no esta registrado'}],
    })
  }
  
  //* Si email valido generamos el token y lo guardamos en la DB
  usuario.token = generarId();
  await usuario.save();

  //* Ahora enviamos un email con el enlace para resetear el password
  emailOlvidePassword({
    email: usuario.email,
    nombre: usuario.nombre,
    token: usuario.token,
  });

  // mostrar mensaje de confirmación (vista indicando que se envio un email)
  res.render('template/mensaje', {
    page: 'Restablece tu Password',
    mensaje: 'Hemos Enviado un email con las instrucciones para restablecer tu password.'
  })
}



//! Comprobar Token para poder resetear password
const comprobarToken = async(req, res, next) => {
  const {token} = req.params;

  // berificar si el token es valido
  const usuario = await Usuario.findOne({ where: {token}})

  if(!usuario) {
    return res.render('auth/confirmar-cuenta', {
      page: 'Restablece tu Password',
      mensaje: 'Hubo un error al validar tu información, intenta nuevamente.',
      error: true
    })
  }

  res.render('auth/reset-password', {
    page: 'Restablece tu Password',
    csrfToken: req.csrfToken(),
  })
}



//! Reseteamos el password
const nuevoPassword = async(req, res) => { // destructuraos la data del formulario
  const { password } = req.body;

  // Validacion  
  await check('password').isLength({ min: 6 }).withMessage('Password debe ser de al menos 6 caractere').run(req);

  let arrayErrores = validationResult(req);  // arrayErrores() retorna un array con los errors
    
  // SI resultado esta no esta vacio mostramos los errores
  if(!arrayErrores.isEmpty()) {
    // hay errores de validacion
    return res.render('auth/reset-password', {
      page: "Restablecer Password",
      csrfToken: req.csrfToken(),
      errores: arrayErrores.array()
    })
  }

  // identificar el usuario que hace el cambio (usamos el token para buscar el usurio)
  const {token} = req.params;
  const usuario = await Usuario.findOne({ where: {token}})

  // se hashea el password
  const salt = await bcrypt.genSalt(10);
  usuario.password = await bcrypt.hash(password, salt);

  // se elimina el token
  usuario.token = null;

  // guardamos el usuario
  await usuario.save();

  res.render('auth/confirmar-cuenta', {
    page: 'Password Restablecido',
    mensaje: 'El Password se guardo correctamente',      
    error: false
  })

}



export {
  formularioLogin,
  autenticar,
  formularioRegistro,
  registrar,
  confirmar,
  formularioOlvidePassword,
  resetPassword,
  comprobarToken,
  nuevoPassword,
}