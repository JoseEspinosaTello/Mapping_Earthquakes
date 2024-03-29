// We create the tile layer that will be the background of our map.
//replace - https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}
//with dark-v10 - this give dark background even outside a dark mode browser https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}

let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let satelliteStreets  = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken:API_KEY
		
});

// Create a base layer that holds both maps.
let baseMaps = {
	"Street": streets,
	"Satellite": satelliteStreets ,
};

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streets]
})

// This function determines the radius of the earthquake marker based on its magnitude.

// Earthquakes with a magnitude of 0 will be plotted with a radius of 1.

function getRadius(magnitude) { 

	if (magnitude ===0) { 
	
		return 1;
		
	} 
	
	return magnitude * 4;
};


// This function returns the style data for each of the earthquakes we plot on

// the map. We pass the magnitude of the earthquake into a function

// to calculate the radius.

function styleInfo(feature) {

	return {
		
		opacity: 1,
		
		fillOpacity: 1,
		
		fillColor: "#ffae42",
		
		color: "#000000",
		
		radius: getRadius(),
		
		stroke: true,
		
		weight: 0.5
		
	};
	
}


// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);


// Retrieve the earthquake GeoJSON data.
//json data is read into the function stored in data.

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {

	// Creating a GeoJSON layer with the retrieved data.
	L.geoJSON(data, {

		
		// We turn each feature into a circleMarker on the map.
		//function is standardized latlng will know to pull the coordinates from json data
		pointToLayer: function(feature, latlng) {
					console.log(data);
					return L.circleMarker(latlng);
				},

				// We set the style for each circleMarker using our styleInfo function.
				style: styleInfo,
			
			}).addTo(map);
});
