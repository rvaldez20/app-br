import express from 'express';

import usuarioRoutes from './src/routes/usuarioRoutes.js';

const PORT = 3000;

// Crear la app
const app = express();


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