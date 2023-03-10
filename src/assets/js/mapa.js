(function() {
    // const lat = 20.67444163271174;       guadalajara
    // const lng = -103.38739216304566;
    
    // se verifica si existe una hubicación previa si no toma la ubicación por defecto
    // se puede usar usando el logical or
    const lat = document.querySelector('#lat').value || 24.0239822;
    const lng = document.querySelector('#lng').value ? document.querySelector('#lng').value :-104.6721137;
    const mapa = L.map('mapa').setView([lat, lng ], 16);
    let market;

    // Utilizar Provider y Geocoder
    const geocodeService = L.esri.Geocoding.geocodeService();

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    // pin
    market = new L.marker([lat, lng], {
      draggable: true,
      autoPan: true,
    })
    .addTo(mapa)

    // detectar lat y lng de la posicion del pin
    market.on('moveend', function(e){
      market = e.target

      const posicion = market.getLatLng();
      // console.log(posicion)

      // despues de soltar el pin se centra el mapa
      mapa.panTo(new L.LatLng(posicion.lat, posicion.lng));

      //obtner información de la calle al mover el PIN
      geocodeService.reverse().latlng(posicion, 13).run(function(error, resultado){
        console.log(resultado)

        market.bindPopup(resultado.address.LongLabel)

        // llenar los campos (input hidden de calle, lat y lng)
        document.querySelector('.calle').textContent = resultado.address?.Address ?? '';
        document.querySelector('#calle').value = resultado.address?.Address ?? '';
        document.querySelector('#lat').value = resultado.latlng?.lat ?? '';
        document.querySelector('#lng').value = resultado.latlng?.lng ?? '';
 

      })

    })

})()