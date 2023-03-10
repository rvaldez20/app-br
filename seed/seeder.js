// seeders
import categorias from './categorias.js'
import precios from './precios.js'

// Importamos los modelos Modelos
import { Categoria, Precio } from '../src/models/index.js'

import db from '../src/config/db.js';

const importarDatos = async () => {
  try {
    // !Autenticar
    await db.authenticate();

    // !Generar las columnas
    await db.sync();

    // ! Promise.all ejecuta al mismo tiempo las importacion de categorias y precios
    await Promise.all([
      Categoria.bulkCreate(categorias), 
      Precio.bulkCreate(precios)
    ]);

    console.log('Datos Importados Correctamente')
    process.exit();

  } catch (error) {
    console.log(error)
    process.exit(1);  // finaliza el proceso
  }
}



const eliminarDatos = async () => {
  try {
    // ! Promise.all ejecuta al mismo tiempo la eliminación de la data de categorias y precios
    // await Promise.all([
    //   Categoria.destroy({ where: {}, truncate: true }), 
    //   Precio.destroy({ where: {}, truncate: true })
    // ]);


    // otra forma
    await db.sync({ force: true });

    console.log('Datos Eliminados Correctamente')
    process.exit();
  } catch (error) {
    console.log(error)
    process.exit(1);  // finaliza el proceso
  }
}




// si se le pasa el argumento -i en el script ejectua la fucncion para importar los datos
if(process.argv[2] === '-i'){
  importarDatos();
}

// si se le pasa el argumento -e en el script ejectua la fucncion para eliminas data de 
// categoria y precios
if(process.argv[2] === '-e'){
  eliminarDatos();
}