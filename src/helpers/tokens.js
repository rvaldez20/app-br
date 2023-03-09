import jwt from 'jsonwebtoken'

//! Funcion para generar un token aleatorio
const generarId = () => Math.random().toString(32).substring(2) + Date.now().toString(32);

//! Funcion para generar un JWT
const generarJWT = (id) => jwt.sign({ id }, process.env.JWT_SCERET, {
    expiresIn: '1d'
  })




export {
  generarId,
  generarJWT,
}