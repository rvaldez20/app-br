import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send({ message: 'Respuesta GET' })
})


export default router;