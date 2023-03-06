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

  // enviamos el email
  await transport.sendMail({
    from: 'BienesRaices.com',  // sender address
    to: email,                  // list of receivers
    subject: `Confirma tu cuenta en BienesRaices.com`,  // Subject line
    text: `Confirma tu cuenta en BienesRaices.com`, // plain text body
    html: `
      <p> Hola ${nombre}, comprueba tu cuenta en BienesRaices.com</p>
      
      <p>Tu cuenta ya esta lista, solo debes confirmarla en el siguiente enlace: 
      <a href="">Confirmar Cuenta</a> 

      <p>Si tu no create esta cuenta, puedes ignorar el mensaje</p>
    `, // html body
  });
}


export {
  emailRegistro
}