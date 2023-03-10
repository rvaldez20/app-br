import { validationResult } from 'express-validator';

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
    csrfToken: req.csrfToken(),
    categorias,
    precios,
  })
}


//! POST para envio y guarda la propiedad
const guardarPropiedad = async(req, res) => {

  // Consultar Modelos de Precios y Categorias
  const [categorias, precios] = await Promise.all([
      Categoria.findAll(),
      Precio.findAll(),
  ]);

  // verificamos si hubo errores
  let resultado = validationResult(req);
  
  // Si resultado esta no esta vacio mostramos los errores
  if(!resultado.isEmpty()) {
    // hay errores de validacion
    return res.render('propiedades/crear', {
      page: "Crear Propiedad",
      barra: true,
      errores: resultado.array(),
      csrfToken: req.csrfToken(),
      categorias,
      precios,
    })
  }

}

export {
  admin,
  crear,
  guardarPropiedad,
}
