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
    const usuario = await Usuario.scope('eliminarPassword').findByPk(payload.id);
    
    // verificamos si existe el usuario
    if(usuario) {
      // si existe lo agregamos al req
      req.usuario = usuario;

    } else {
      // si el usuario no existe
      res.redirect('/auth/login')
    }

    // lo dejamos pasar al siguiente middleware
    return next();
    
  } catch (error) {
    // si es un jwt alterado lo eliminamos y los redireccionamos al login
    return res.clearCookie('_token').redirect('/auth/login')
  }
  
}


export default protegerRuta;