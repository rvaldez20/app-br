
import Categoria from '../models/Categoria.js';
import Precio from '../models/Precio.js';


//! Panel Admin
const admin = (req, res) => {
  res.render('propiedades/admin', {
    page: 'Mis Propiedades',
    barra: true
  })
}


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

export {
  admin,
  crear,
}
