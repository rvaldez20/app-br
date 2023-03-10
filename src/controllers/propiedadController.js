
import Categoria from '../models/Categoria.js';
import Precio from '../models/Precio.js';


//! Panel Admin (Home)
const admin = (req, res) => {
  res.render('propiedades/admin', {
    page: 'Mis Propiedades',
    barra: true
  })
}

//! Formulario para crear una propiedad
const crear = async (req, res) => {
  // Consultar Modelos de Precios y Categorias
  const [categorias, precios] = await Promise.all([
      Categoria.findAll(),
      Precio.findAll(),
  ]);

  res.render('propiedades/crear', {
    page: 'Crear Propiedad',
    barra: true,
    categorias,
    precios,
  })
}


//! POST para envio y guarda la propiedad
const guardarPropiedad = (req, res) => {

}

export {
  admin,
  crear,
  guardarPropiedad,
}
