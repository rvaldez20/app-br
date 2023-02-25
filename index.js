import express from 'express';

import usuarioRoutes from './src/routes/usuarioRoutes.js';

const PORT = 3000;

// Crear la app
const app = express();


// Routes
app.use('/', usuarioRoutes)


// listen
app.listen(PORT, () => {
  console.log(`Server run on port ${PORT}`);
})