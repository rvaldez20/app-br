import { check, validationResult } from 'express-validator';

import Usuario from '../models/Usuario.js'


const formularioLogin = (req, res) => {
  res.render('auth/login', {
    page: "Iniciar Seción"
  })
}

const formularioRegistro = (req, res) => {
  res.render('auth/registro', {
    page: "Crear Cuenta"
  })
}

const registrar = async(req, res) => {
  // destructuraos la data del formulario
  const { password, repetir_password } = req.body;

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
    })
  }

  
  const usuario = await Usuario.create(req.body);
  res.json(usuario);
}

const formularioOlvidePassword = (req, res) => {
  res.render('auth/olvide-password', {
    page: "Recupera tu acceso a Bienes Raices"
  })
}

export {
  formularioLogin,
  formularioRegistro,
  registrar,
  formularioOlvidePassword,
}