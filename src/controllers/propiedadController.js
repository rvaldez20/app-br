import { validationResult } from 'express-validator';

import { Categoria, Precio, Propiedad } from '../models/index.js';


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
    csrfToken: req.csrfToken(),
    categorias,
    precios,
    datos: {}
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
      errores: resultado.array(),
      csrfToken: req.csrfToken(),
      categorias,
      precios,
      datos: req.body
    })
  }

  // destructuramos todo del body
  const {
    titulo,
    descripcion,
    habitaciones,
    estacionamiento,
    wc,
    calle,
    lat,
    lng,
    precio: precioId,           // renombramos precio a precioId
    categoria: categoriaId,     // renombramos categoria a categoriaId
  } = req.body;

  const { id: usuarioId } = req.usuario;

  try {
    // preparamos la data y la guardamos
    const propiedadGuardada = await Propiedad.create({
      titulo,
      descripcion,
      habitaciones,
      estacionamiento,
      wc,
      calle,
      lat,
      lng,
      precioId,
      categoriaId,
      usuarioId,
      imagen: ''
    });

    const  { id } = propiedadGuardada;

    res.redirect(`/propiedades/agregar-imagen/${id}`);

  } catch (error) {
    console.log(error)
  }
}


//! Formulario para agregar la imagen
const agregarImagen = async(req, res) => {
  const { id } = req.params;

  // validar que el iD de la propiedad sea valido
  const propiedad = await Propiedad.findByPk(id);
  
  if(!propiedad) {
    return res.redirect('/mis-propiedades')
  }



  // validar que la propiedad ya este publicada


  // validar que la propiedad pertenezca a quien visita la pagina

  res.render('propiedades/agregar-imagen', {
    page: 'Agregar Imágen',
    csrfToken: req.csrfToken(),   
  })

}

export {
  admin,
  crear,
  guardarPropiedad,
  agregarImagen,
}
