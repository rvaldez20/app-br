import nodemailer from 'nodemailer';

const emailRegistro = async(datos) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const { nombre, email, token } = datos;

  // const href = ``;
  // console.log(href);

  // enviamos el email
  await transport.sendMail({
    from: 'BienesRaices.com',                           // sender address
    to: email,                                          // list of receivers
    subject: `Confirma tu cuenta en BienesRaices.com`,  // Subject line
    text: `Confirma tu cuenta en BienesRaices.com`,     // plain text body
    html: `
      <p> Hola ${nombre}, comprueba tu cuenta en BienesRaices.com</p>

      <p>Tu cuenta ya esta lista, solo debes confirmarla en el siguiente enlace: 
      <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/confirmar/${token}">Confirmar Cuenta</a> 

      <p>Si tu no create esta cuenta, puedes ignorar el mensaje</p>
    `, // html body
  });
}


const emailOlvidePassword = async(datos) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const { nombre, email, token } = datos;

  // const href = ``;
  // console.log(href);

  // enviamos el email
  await transport.sendMail({
    from: 'BienesRaices.com',                           // sender address
    to: email,                                          // list of receivers
    subject: `Restablece tu Password en BienesRaices.com`,  // Subject line
    text: `Restablece tu Password en BienesRaices.com`,     // plain text body
    html: `
      <p> Hola ${nombre}, has solicitado restablecer tu password en BienesRaices.com</p>

      <p>Sigue el siguiente enlace para generar un nuevo password: 
      <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/olvide-password/${token}">Restablecer Password</a> 

      <p>Si tu no solicitaste el cambio de password, puedes ignorar el mensaje</p>
    `, // html body
  });
}


export {
  emailRegistro,
  emailOlvidePassword,
}