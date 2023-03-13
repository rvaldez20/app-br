import {Dropzone } from 'dropzone';

const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
// console.log(token)

Dropzone.options.imagen = {
  dictDefaultMessage: 'Sube tus imágenes aquí',
  acceptedFiles: '.png,.jpg,.jpeg',
  maxFilesize: 5,
  maxFiles: 1,
  parallelUploads: 1,   // se recomienda que sea igual a maxFiles 
  autoProcessQueue: false,
  addRemoveLinks: true,
  dictRemoveFile: 'Borrar Archivo',
  dictMaxFilesExceeded: 'El limite es 1 archivo',
  headers: {
    'CSRF-Token': token
  },
  paramName: 'imagen',
  init: function() {
    const dropzone = this;

    const btnPublicar = document.querySelector('#publicar');
    // console.log(btnPublicar)
    btnPublicar.addEventListener('click', function() {
      dropzone.processQueue();
    })

    // una vez que finaliza de almaenar la imagenes ejecuta el evento .on
    dropzone.on('queuecomplete', function(file, mesmensajesage) {
      if(dropzone.getActiveFiles().length == 0) {
        window.location.href = '/mis-propiedades'
      }
    })

  }
}

