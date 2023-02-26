
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

const formularioOlvidePassword = (req, res) => {
  res.render('auth/olvide-password', {
    page: "Recupera tu acceso a Bienes Raices"
  })
}

export {
  formularioLogin,
  formularioRegistro,
  formularioOlvidePassword,
}