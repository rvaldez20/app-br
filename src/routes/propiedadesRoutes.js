import express from 'express';
import { body } from 'express-validator';

import { 
  admin,
  crear,
  guardarPropiedad
} from '../controllers/propiedadController.js';

const router = express.Router();

router.get('/mis-propiedades', admin);

router.get('/propiedades/crear', crear);              // formulario para crear propiedad
router.post('/propiedades/crear', 
  body('titulo').notEmpty().withMessage('El titulo del anuncio es requerido'),
  guardarPropiedad);  




export default router;