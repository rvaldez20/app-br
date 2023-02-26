
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

export {
  formularioLogin,
  formularioRegistro
}