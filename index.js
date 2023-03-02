import express from 'express';

import usuarioRoutes from './src/routes/usuarioRoutes.js';
import db from './src/config/db.js';

const PORT = 3000;

// Crear la app
const app = express();

// habilitamos parser (envio datos formulario)
app.use(express.urlencoded({extended: true}));


// Conexión a la DB
try {
  await db.authenticate();
  db.sync();
  console.log('DB connected')
} catch (error) {
  console.log(error)
}


// habilitar Template Engine (pug)
app.set('view engine', 'pug');
app.set('views', './src/views');


// Directorio public
app.use(express.static('public'));


// Routes
app.use('/auth', usuarioRoutes)



// listen
app.listen(PORT, () => {
  console.log(`Server run on port ${PORT}`);
})