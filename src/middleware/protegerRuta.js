import jwt from 'jsonwebtoken';

import { Usuario } from '../models/index.js';

const protegerRuta = async (req, res, next) => {

  // verificar si hay un token (se extrae de las cookie) si no hay se redirecciona al login
  const { _token } = req.cookies;
  if(!_token) {
    return res.redirect('/auth/login');
  }

  // si hay token, entonces lo verificamos
  try {
    const payload = jwt.verify(_token, process.env.JWT_SECRET);

    // verificamos el usuario
    const usuario = await Usuario.findByPk(payload.id);
    console.log(usuario);

    // si el token es correcto lo dejamos pasar a /mis-propiedades
    // next();
    
  } catch (error) {
    // si es un jwt alterado lo eliminamos y los redireccionamos al login
    return res.clearCookie('_token').redirect('/auth/login')
  }
  
}


export default protegerRuta;