// Inicializa el mapa y establece la vista
const map = L.map('map').setView([40.5545, -3.6099], 13); // Coordenadas de la empresa

// Capa de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '© OpenStreetMap'
}).addTo(map);




// Marcador de la ubicación de la empresa
const businessLocation = [40.5545, -3.6099]; // Coordenadas de la empresa
const businessMarker = L.marker(businessLocation).addTo(map)
    .bindPopup('Ubicación de la empresa')
    .openPopup();
    

// Función para calcular la ruta
function calculateRoute() {
    if ("geolocation" in navigator) {
       navigator.geolocation.getCurrentPosition(
       (position) => {
            const userLocation = [position.coords.latitude, position.coords.longitude];
            
            // Agrega un marcador para la ubicación del cliente
            L.marker(userLocation).addTo(map)
                .bindPopup('Tu ubicación')
                .openPopup();

            // Crea la ruta usando Leaflet Routing Machine
            if (L.Routing && L.Control.Geocoder) {
                L.Routing.control({
                    waypoints: [
                        L.latLng(userLocation), // Ubicación del cliente
                        L.latLng(businessLocation) // Ubicación de la empresa
                    ],
                    routeWhileDragging: true,
                    geocoder: L.Control.Geocoder.nominatim() // Geocodificador
                }).addTo(map);   
            }
            
            map.fitBounds([userLocation, businessLocation]); // Ajusta el zoom para ver ambas ubicaciones
            }, error => {
            console.error("Error obteniendo la geolocalización:", error); 
        });
    } else {
        alert("La geolocalización no está disponible en este navegador.");
    }
}

// Llama a la función para calcular la ruta
calculateRoute();
