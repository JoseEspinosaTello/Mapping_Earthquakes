// Add console.log to check to see if our code is working.

console.log("working");

// Create the map object with a center and zoom level.

let map = L.map('mapid').setView([40.7, -94.5], 4);

//  Add a marker to the map for Los Angeles, California.

//let marker = L.marker([34.0522, -118.2437]).addTo(map);

//change to circle

// L.circle([34.0522, -118.2437], {
//     radius: 100,
//     color: 'black',
//     fillColor: '#ffffa1',
//     fillOpacity: 0.5,
// }).addTo(map);

//add the circle marker

// L.circleMarker([34.0522, -118.2437], {
//     radius: 300,
//     color: 'black',
//     fillColor: '#ffffa1'
// }).addTo(map);

// removing the LA marker above to add multiple markers

// An array containing each city's location, state, and population.
//array moved to cities.js

// Get data from cities.js
let cityData = cities;

// Loop through the cities array and create one marker for each city.

cityData.forEach(function(city) {

	console.log(city)

    //add each city's location to the mapp by adding location marker

    L.circleMarker(city.location, {
        //add circle marker size of city
        radius: city.population/200000,
        color: 'orange',
        fillColor: '#E48400'
    })
    

    //add the bindPopup method
    //format the population with a thousands separator by using the toLocaleString() method
    .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
  .addTo(map);
	
});


// We create the tile layer that will be the background of our map.
//replace - https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}
//with dark-v10 - this give dark background even outside a dark mode browser

let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});
// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);

