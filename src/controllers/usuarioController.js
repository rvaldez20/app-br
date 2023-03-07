import { check, validationResult } from 'express-validator';

import Usuario from '../models/Usuario.js';
import { generarId } from '../helpers/tokens.js';
import { emailRegistro } from '../helpers/email.js';


//! Formulario Login
const formularioLogin = (req, res) => {
  res.render('auth/login', {
    page: "Iniciar Seción"
  })
}



//! Formulario Regsitro GET
const formularioRegistro = (req, res) => {
  res.render('auth/registro', {
    page: "Crear Cuenta"
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
const confirmarCuenta = (req, res) => {
  const {token} = req.params;
  console.log(token);

  // berificar si el token es valido


  // si es valido, se confirma la cuenta

  

  // res.render('/confirmar', {
  //   page: "Confirma tu Cuenta"
  // })
}



//! Formulario Olvide Password
const formularioOlvidePassword = (req, res) => {
  res.render('auth/olvide-password', {
    page: "Recupera tu Acceso a Bienes Raices"
  })
}


export {
  formularioLogin,
  formularioRegistro,
  registrar,
  confirmarCuenta,
  formularioOlvidePassword,
}