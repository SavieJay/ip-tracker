const address = document.querySelector(".ip-result");
const iplocation = document.querySelector(".location-result");
const timezone = document.querySelector(".timezone-result");
const isp = document.querySelector(".isp-result");
const search = document.querySelector(".search");
const response = document.querySelector(".response");

// const ipKEY = "at_6T1LRYwFjRTg6LO0bBVSLIJCY0BtU";



search.addEventListener('click', () => {
    console.log(response.value);
    fetchLocation(response.value);
    getIP(data);   
});
function getIP(data){
    console.log("This is it:", data);
    address.innerHTML = data.ip || 'N/A';
    
    iplocation.innerHTML = `${data.location.city}, ${data.location.region}, ${data.location.country}`;
    
    timezone.innerHTML = `UTC ${data.location.timezone || 'Unknown'}`;
    
    isp.innerHTML = data.isp || 'N/A';

    const latitude = data.location.lat;
    const longitude = data.location.lng; 

    updateMap(latitude, longitude);
}

let mapInstance = null;
let currentMarker = null;

function updateMap(latitude, longitude) {
    const mapContainer = document.querySelector('.map');

    // If map instance doesn't exist, create it; otherwise, just update the view
    if (!mapInstance) {
        mapInstance = L.map(mapContainer, {
            center: [latitude, longitude],
            zoom: 13,
            zoomControl: true,  // We'll add zoom control in a custom position
            scrollWheelZoom: true,
        });

        // Add zoom control to the top right corner
        L.control.zoom({
            position: 'topright'
        }).addTo(mapInstance);

        // Add tile layer
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 20
        }).addTo(mapInstance);

        // Add click event to map for adding new markers
        mapInstance.on('click', function(e) {
            addMarker(e.latlng.lat, e.latlng.lng);
        });
    } else {
        mapInstance.setView([latitude, longitude], 13);
    }

    // Add or update marker
    addMarker(latitude, longitude);
}

function addMarker(lat, lng) {
    if (currentMarker) {
        mapInstance.removeLayer(currentMarker);
    }

    currentMarker = L.marker([lat, lng]).addTo(mapInstance);
    currentMarker.bindPopup(`Latitude: ${lat.toFixed(4)}<br>Longitude: ${lng.toFixed(4)}`).openPopup();

    // You can add more interactivity to the marker here
    currentMarker.on('click', function() {
        this.openPopup();
    });

    // Optional: Update the IP information based on the new location
    // This would require a reverse geocoding service
    // reverseGeocode(lat, lng);
}


// let ip = "192.212.174.101";
const fetchLocation = (ipAddress) => {
    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_6T1LRYwFjRTg6LO0bBVSLIJCY0BtU&ipAddress=${ipAddress}`).then((res) => res.json()).then((data) => {
        console.log(data);

        getIP(data);
    });

}


// fetchLocation(ip);






//  function initializeIPTracker() {
//     const search = document.querySelector(".search");
//     const response = document.querySelector(".response");

//     search.addEventListener('click', () => {
//         const ipAddress = response.value.trim();
//         if (ipAddress) {
//             fetchLocation(ipAddress);
//         } else {
//             console.error("Please enter a valid IP address");
//         }
//     });
// }

// function updateUI(data) {
//     if (!data) {
//         console.error("No data received");
//         return;
//     }

//     const address = document.querySelector(".ip-result");
//     const iplocation = document.querySelector(".location-result");
//     const timezone = document.querySelector(".timezone-result");
//     const isp = document.querySelector(".isp-result");

//     address.textContent = data.ip || "N/A";
//     iplocation.textContent = data.location ? `${data.location.city || "Unknown"}, ${data.location.country || "Unknown"}` : "N/A";
//     timezone.textContent = data.location && data.location.timezone ? `UTC ${data.location.timezone}` : "N/A";
//     isp.textContent = data.isp || "N/A";
// }

// function fetchLocation(ipAddress) {
//     const apiKey = "at_6T1LRYwFjRTg6LO0bBVSLIJCY0BtU";
//     const apiUrl = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ipAddress}`;

//     fetch(apiUrl)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }
//             return response.json();
//         })
//         .then(data => {
//             console.log("Fetched data:", data);
//             updateUI(data);
//         })
//         .catch(error => {
//             console.error("Error fetching location data:", error);
//         });
// }

// // Initialize the IP tracker when the script loads
// initializeIPTracker();
