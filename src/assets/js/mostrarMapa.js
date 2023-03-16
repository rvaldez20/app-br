(function() {

  const titulo = document.querySelector('#titulo').textContent;
  const calle = document.querySelector('#calle').textContent;
  const lat = document.querySelector('#lat').textContent;
  const lng = document.querySelector('#lng').textContent;
  const mapa = L.map('mapa').setView([lat, lng ], 16);

  // agregamos la contribucion
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(mapa);

  // pin
  market = new L.marker([lat, lng])
    .addTo(mapa)
    .bindPopup(`${titulo} | ${calle}`)




})()