// Este archivo va importar tods los modelos
import Propiedad from './Propiedad.js';
import Precio from './Precio.js';
import Categoria from './Categoria.js';
import Usuario from './Usuario.js';

// hasOne (relacion 1:1) se entiende mejor leyendose de derecha a izquierda
// Precio.hasOne(Propiedad);

// belogsTo (relacion 1:1) se entiende de mejor forma de izquierda a derecha
// Una proiedad tiene un precio
Propiedad.belongsTo(Precio, { foreignKey: 'precioId' });
Propiedad.belongsTo(Categoria, { foreignKey: 'categoriaId' });
Propiedad.belongsTo(Usuario, { foreignKey: 'usuarioId' });


export {
  Propiedad,
  Precio,
  Categoria,
  Usuario,
}