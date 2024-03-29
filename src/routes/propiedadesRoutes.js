import express from 'express';
import { body } from 'express-validator';

import protegerRuta from '../middleware/protegerRuta.js';
import upload from '../middleware/subirImagen.js'

import { 
  admin,
  crear,
  guardarPropiedad,
  agregarImagen,
  almacenarImagen,
  editar,
  guardarCambios,
  eliminar,
  mostrarPropiedad,
} from '../controllers/propiedadController.js';

const router = express.Router();

router.get('/mis-propiedades', protegerRuta, admin);

router.get('/propiedades/crear', protegerRuta, crear);              // formulario para crear propiedad
router.post('/propiedades/crear', 
  protegerRuta,
  body('titulo').notEmpty().withMessage('El titulo del anuncio es requerido'),
  body('descripcion')
    .notEmpty().withMessage('La descripción es requerida')
    .isLength({ max: 200 }).withMessage('La descripción es muy extensa'),
  body('categoria').isNumeric().withMessage('Es necesario seleccionar una categoria'),
  body('precio').isNumeric().withMessage('Es necesario seleccionar un rango de precios'),
  body('habitaciones').isNumeric().withMessage('Es necesario seleccionar la cantidad de habitaciones'),
  body('estacionamiento').isNumeric().withMessage('Es necesario seleccionar la cantidad de estacionamientos'),
  body('wc').isNumeric().withMessage('Es necesario seleccionar la cantidad de baños'),
  body('lat').notEmpty().withMessage('Es necesario ubicar la propiedad en el mapa'),
  guardarPropiedad);  

  router.get('/propiedades/agregar-imagen/:id', protegerRuta, agregarImagen);
  router.post('/propiedades/agregar-imagen/:id', 
    protegerRuta, 
    upload.single('imagen'),
    almacenarImagen,
  );

  router.get('/propiedades/editar/:id', 
    protegerRuta,
    editar
  );
  router.post('/propiedades/editar/:id', 
  protegerRuta,
  body('titulo').notEmpty().withMessage('El titulo del anuncio es requerido'),
  body('descripcion')
    .notEmpty().withMessage('La descripción es requerida')
    .isLength({ max: 200 }).withMessage('La descripción es muy extensa'),
  body('categoria').isNumeric().withMessage('Es necesario seleccionar una categoria'),
  body('precio').isNumeric().withMessage('Es necesario seleccionar un rango de precios'),
  body('habitaciones').isNumeric().withMessage('Es necesario seleccionar la cantidad de habitaciones'),
  body('estacionamiento').isNumeric().withMessage('Es necesario seleccionar la cantidad de estacionamientos'),
  body('wc').isNumeric().withMessage('Es necesario seleccionar la cantidad de baños'),
  body('lat').notEmpty().withMessage('Es necesario ubicar la propiedad en el mapa'),
  guardarCambios);

  router.post('/propiedades/eliminar/:id',
    protegerRuta,
    eliminar
  )

  //! ============== RUTAS PUBLICAS
  router.get('/propiedad/:id', mostrarPropiedad);


export default router;