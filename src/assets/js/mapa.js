(function() {
    // const lat = 20.67444163271174;       guadalajara
    // const lng = -103.38739216304566;
    const lat = 24.0239822;
    const lng = -104.6721137;
    const mapa = L.map('mapa').setView([lat, lng ], 16);
    
    let market;

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
    })

})()