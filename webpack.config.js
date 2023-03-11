import path from 'path'

export default {
  mode: 'development',
  entry: {
    mapa: './src/assets/js/mapa.js',
    agregarImagen: './src/assets/js/agregarImagen.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve('public/js')
  }
}