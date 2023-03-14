import { validationResult } from 'express-validator';

import { Categoria, Precio, Propiedad } from '../models/index.js';


//! Panel Admin (Home)
const admin = async(req, res) => {

  const { id } = req.usuario;

  const propiedades = await Propiedad.findAll(
    { 
      where: {
        usuarioId: id,
      },
      include: [
        { model: Categoria },
        { model: Precio }
      ],
    }
  )

  // console.log(propiedades)

  res.render('propiedades/admin', {
    page: 'Mis Propiedades',
    propiedades
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


  // validar que la propiedad no este publicada
  if(propiedad.publicado) {
    return res.redirect('/mis-propiedades')
  }


  // validar que la propiedad pertenezca a quien visita la pagina
  if(req.usuario.id.toString() !== propiedad.usuarioId.toString()) {
    return res.redirect('/mis-propiedades')
  }


  res.render('propiedades/agregar-imagen', {
    page: `Agregar Imágen: ${propiedad.titulo}`,
    csrfToken: req.csrfToken(),
    propiedad,
  })
}


//! Procesa el publicar la propiedad y guardar el nambre de la imagen y redirec a mis propiedades
const almacenarImagen = async(req, res, next) => {
  const { id } = req.params;

  // validar que el iD de la propiedad sea valido
  const propiedad = await Propiedad.findByPk(id);
  
  if(!propiedad) {
    return res.redirect('/mis-propiedades')
  }


  // validar que la propiedad no este publicada
  if(propiedad.publicado) {
    return res.redirect('/mis-propiedades')
  }


  // validar que la propiedad pertenezca a quien visita la pagina
  if(req.usuario.id.toString() !== propiedad.usuarioId.toString()) {
    return res.redirect('/mis-propiedades')
  }

  try {
    // console.log(req.file)
    /*
      Al subir la imagen multer registra información en req.file
      {
        fieldname: 'imagen',
        originalname: '7.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        destination: './public/uploads/',
        filename: 'ocdppapesgo1grccs45o.jpg',
        path: 'public\\uploads\\ocdppapesgo1grccs45o.jpg',
        size: 1270714
      }
    */

    // almacenar el nombre de la imagen y publicar la propiedad
    propiedad.imagen = req.file.filename;
    propiedad.publicado = 1;
    await propiedad.save();

    // una vez publiacada y almacenada la imagen redireccionamos a /mis-propiedades
    // pero como el proceso lo finaliza dropzone en el navegador res.redirect no va funcionar
    // por lo que en la configuración de dropzone usamos el evento .on 
    // verificamos que no haya archivos en cola y redireciconamos desde el DOM:
    // window.location.href = '/mis-propiedades'
    
    next();

  } catch (error) {
    console.log(error)
  }
}


//! Formulario para editar propiedad
const editar = async (req, res) => {
  // obteneos el id
  const { id } = req.params;


  //validar que la propiedad este registrada en la base de datos
  const propiedad = await Propiedad.findByPk(id);

  // si no existe propiedad lo regresamos a /mis-propiedades
  if(!propiedad) {
    return res.redirect('/mis-propiedades')
  }

  // validar que la propiedad pertenezca al usuario que la creo
  if(propiedad.usuarioId.toString() !== req.usuario.id.toString()) {
    return res.redirect('/mis-propiedades')
  }


  // Consultar Modelos de Precios y Categorias
  const [categorias, precios] = await Promise.all([
      Categoria.findAll(),
      Precio.findAll(),
  ]);

  res.render('propiedades/editar', {
    page: 'Editar Propiedad',
    csrfToken: req.csrfToken(),
    categorias,
    precios,    
    datos: propiedad
  })
}


export {
  admin,
  crear,
  guardarPropiedad,
  agregarImagen,
  almacenarImagen,
  editar,
}
