const express = require('express');

const PORT = 3000;

// Crear la app
const app = express();

// router
app.get('/', (req, res) => {
  res.send({ message: 'Hola Mundo desde express' })
})

app.get('/nosotros', (req, res) => {
  res.send('nosotros')
})

// listen
app.listen(PORT, () => {
  console.log(`Server run on port ${PORT}`);
})