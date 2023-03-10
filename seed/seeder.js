// seeders
import categorias from './categorias.js'
import precios from './precios.js'

// Modelos
import Categoria from '../src/models/Categoria.js';
import Precio from '../src/models/Precio.js';

import db from '../src/config/db.js';

const importarDatos = async () => {
  try {
    // !Autenticar
    await db.authenticate();
    // const auth = db.authenticate();

    // !Generar las columnas
    await db.sync();
    // const conexionDB = db.sync();

    // !Insertar los datos
    const importCategorias = Categoria.bulkCreate(categorias);
    const importPrecios = Precio.bulkCreate(precios);

    // ! Promise.all
    await Promise.all([importCategorias, importPrecios]);

    console.log('Datos Importados Correctamente')
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