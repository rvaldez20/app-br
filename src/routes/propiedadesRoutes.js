import express from 'express';

import { 
  admin,
  crear,
  guardarPropiedad
} from '../controllers/propiedadController.js';

const router = express.Router();

router.get('/mis-propiedades', admin);

router.get('/propiedades/crear', crear);  // formulario para crear propiedad
router.post('/propiedades/crear', guardarPropiedad);  // envia datos para crear propiedad




export default router;