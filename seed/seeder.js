import categorias from './categorias.js'
import Categoria from '../src/models/Categoria.js';
import db from '../src/config/db.js';

const importarDatos = async () => {
  try {
    // Autenticar
    await db.authenticate();

    // Generar las columnas
    await db.sync();

    // Insertar los datos
    await Categoria.bulkCreate(categorias);
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