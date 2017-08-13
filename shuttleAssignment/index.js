var globalFunctions = (function() {

		return {
			myMap: function() {

				var map,
					locationPoints=[],
					noOfPoints,
					waypoints=[],
					bus,

					/*
					**@createMap
					**This function sets map options and creates a Google map
					*/
					createMap = function() {
						var mapProp= {
						    center:new google.maps.LatLng(28.467,77.041664),
						    zoom:13,
						};

						map=new google.maps.Map(document.getElementById("googleMap"),mapProp)
					},

					/*
					**@plotStations
					**This function plots markers on all the locations defined in an array.
					*/
					plotStations = function() {
						var latLong = [{
								lat: 28.412839,
								lng: 77.041664
								},
								{
								lat: 28.421507,
								lng: 77.039018
								},
								{
								lat: 28.427017,
								lng: 77.037505
								},
								{
								lat: 28.429536,
								lng: 77.040552
								},
								{
								lat: 28.432287,
								lng: 77.046930
								},
								{
								lat: 28.437011,
								lng: 77.045957
								},
								{
								lat: 28.442948,
								lng: 77.038161
								},
								{
								lat: 28.448240,
								lng: 77.038023
								},
								{
								lat: 28.453622,
								lng: 77.043232
								},
								{
								lat: 28.463078,
								lng: 77.052115
								},
								{
								lat: 28.489606,
								lng: 77.080004
								},
								{
								lat: 28.498286,
								lng: 77.088410
								},
								{
								lat: 28.503162,
								lng: 77.088471
								},
								{
								lat: 28.506467,
								lng: 77.083922
								},
								{
								lat: 28.509734,
								lng: 77.079330
								}],

							marker;

						noOfPoints = latLong.length;

						for(var index=0;index<noOfPoints;index++) {

							locationPoints[index] = new google.maps.LatLng(latLong[index].lat,latLong[index].lng);
							marker = new google.maps.Marker({
								position:locationPoints[index]
							});

							marker.setMap(map);

							waypoints[index] = {
								location: locationPoints[index],
								stopover: false 	 
							};
 						}
					},

					/*
					**@createBus
					**This function creates a marker that takes the image of a bus as marker
					*/
					createBus = function() {
						bus = new google.maps.Marker({
	 						position:locationPoints[0],
	 						icon: 'bus.png'
 						});

 						bus.setMap(map);
					},

					/*
					**@plotRouteOnMap
					**This function plots a polyline on the map that goes through all the stations
					*/
					plotRouteOnMap = function() {
						var flightPath = new google.maps.Polyline({
						    path: locationPoints,
						    strokeColor: '#0000FF',
						    strokeOpacity: 0.8,
						    strokeWeight: 2
						});

						flightPath.setMap(map);
					},

					/*
					**@fetchRoute
					**This function fetches an overview of the path that goes through all the stations
					*/
					fetchRoute = function() {
						var directionsService = new google.maps.DirectionsService(),
					    	travelMode = google.maps.DirectionsTravelMode.WALKING,
							request = {
						        origin: locationPoints[0],
						        destination: locationPoints[noOfPoints-1],
						        travelMode: travelMode,
						        waypoints: waypoints
					    	};

					    directionsService.route(request,function(result,status) {
					    		var routePoints = [],
							    	index = 0,					    	
							    	noOfLegs = result.routes[0].legs.length,
							    	moveBus;

						    		for(var i=0;i<noOfLegs;i++) {
						    			var noOfSteps = result.routes[0].legs[i].steps.length;
						    			for(var j=0;j<noOfSteps;j++) {
						    				var noOfPaths = result.routes[0].legs[i].steps[j].path.length;
						    				for(var k=0;k<noOfPaths;k++) {
						    					routePoints[index] = result.routes[0].legs[i].steps[j].path[k];
						    					index++;
						    				}
						    			}
						    		}

						    		/*
									**@moveBus
									**This function moves the bus marker by changing its position periodically.
									*/
						    		moveBus = function() {
						    			var index = 0;

						    			setInterval(function() {
								    		bus.setPosition(routePoints[index]);
								    		index++;
						 				}, 70);	
						    		}

						    		moveBus();
					    });
					};

					createMap();
					plotStations();
					createBus();
					plotRouteOnMap();
					fetchRoute();
 					
			}
		}
})();


