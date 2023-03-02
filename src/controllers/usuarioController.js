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