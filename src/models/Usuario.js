import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';

import db from '../config/db.js';

const Usuario = db.define('usuarios', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    // unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  confirmado: {
    type: DataTypes.BOOLEAN
  },
},{
  hooks: {
    beforeCreate: async function(usuario) {
      const salt = await bcrypt.genSalt(10);
      usuario.password = await bcrypt.hash(usuario.password, salt);
    }
  },
  scopes: { // permite eliminar campos de una consulta: Modelo.scope('name_scope').find()
    eliminarPassword: {
      attributes: {
        exclude: ['password', 'token', 'confirmado', 'createdAt', 'updatedAt']
      }
    }
  }
})

// Metodo personalizado de sequelize
Usuario.prototype.verificarPassword = function(passwordPlano) {
  return bcrypt.compareSync(passwordPlano, this.password);
}


export default Usuario;