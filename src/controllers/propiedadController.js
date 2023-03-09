

//! Panel Admin
const admin = (req, res) => {
  res.render('propiedades/admin', {
    page: 'Mis Propiedades'
  })
}

export {
  admin,
}
