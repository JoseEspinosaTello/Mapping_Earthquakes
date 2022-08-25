// Add console.log to check to see if our code is working.

console.log("working");

// Create the map object with a center and zoom level.

//center of map set between lax and sfo
//let map = L.map('mapid').setView([36.1733, -120.1794], 7);

// Create the map object with center at the San Francisco airport.
let map = L.map('mapid').setView([37.5, -122.5], 10);

// Add GeoJSON data.
let sanFranAirport =
{"type":"FeatureCollection","features":[{
    "type":"Feature",
    "properties":{
        "id":"3469",
        "name":"San Francisco International Airport",
        "city":"San Francisco",
        "country":"United States",
        "faa":"SFO",
        "icao":"KSFO",
        "alt":"13",
        "tz-offset":"-8",
        "dst":"A",
        "tz":"America/Los_Angeles"},
        "geometry":{
            "type":"Point",
            "coordinates":[-122.375, 37.61899948120117]}}
]};

// Grabbing our GeoJSON data.
//L.geoJSON(sanFranAirport).addTo(map);


L.geoJSON(sanFranAirport, {
	// We turn each feature into a marker on the map.
	onEachFeature: function(feature, layer) {
    console.log(layer);
    layer.bindPopup();
  }

}).addTo(map);

// add marker with functionality
// Grabbing our GeoJSON data.

L.geoJSON(sanFranAirport, {


	pointToLayer: function(feature, latlng) {
	
		console.log(feature);
		
		return L.marker(latlng)
    
    //add the popup marker
    .bindPopup("<h2>" + feature.properties.city + "</h2>");
		
	}
	
}).addTo(map);


// We create the tile layer that will be the background of our map.
//replace - https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}
//with dark-v10 - this give dark background even outside a dark mode browser https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}

let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});
// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);

