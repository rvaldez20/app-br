import bcrypt from 'bcrypt';

const usuarios = [
    {
        nombre: 'develop',
        email: 'develop@bienesraices.com',
        confirmado: 1,
        password: bcrypt.hashSync('password', 10)
    },
    {
        nombre: 'admin',
        email: 'admin@bienesraices.com',
        confirmado: 1,
        password: bcrypt.hashSync('superadmin123', 10)
    },
    {
        nombre: 'Raul Valdez',
        email: 'rvaldez20@correo.com',
        confirmado: 1,
        password: bcrypt.hashSync('123456', 10)
    },
]

export default usuarios;

  