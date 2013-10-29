define(['leaflet', 'stops'], function (L, stops) {
    var icons = {
        user: L.icon({
            iconUrl: '/images/user-marker-icon.png',
            iconRetinaUrl: '/images/user-marker-icon-2x.png',
            iconSize: [25, 41],
            iconAnchor: [15, 41]
        }),
        bus: L.icon({
            iconUrl: '/images/bus-marker-icon.png',
            iconRetinaUrl: '/images/bus-marker-icon-2x.png',
            iconSize: [25, 41],
            iconAnchor: [15, 41],
            popupAnchor: [-3, -46],
            shadowUrl: '/images/marker-shadow.png',
            shadowSize: [68, 45],
            shadowAnchor: [22, 44]
        }),
        stop: L.icon({
            iconUrl: '/images/stop-marker-icon.png',
            iconRetinaUrl: '/images/stop-marker-icon-2x.png',
            iconSize: [25, 41],
            iconAnchor: [15, 41],
            popupAnchor: [-3, -46],
            shadowUrl: '/images/marker-shadow.png',
            shadowSize: [68, 45],
            shadowAnchor: [22, 44]
        })
    };

    return {
        map: L.map('map'),
        busMarker: L.marker(),
        userMarker: L.marker(),
        icons: {},
        init: function(location) {
            this.map.setView(location, 16);

            L.tileLayer('http://{s}.maplink.com.br/tilegenerator/tile.ashx/?&x={x}&y={y}&zoom={z}', {
                subdomains: ['tile-map1', 'tile-map2', 'tile-map3', 'tile-map4'],
                attribution: '&copy; Map data <a href="http://www.maplink.com.br/">MapLink</a>'
            }).addTo(this.map);

            this.busMarker
                .setIcon(icons.bus)
                .setLatLng(location)
                .addTo(this.map);

            this.displayBusStops();

            this.map.panTo(location);
        },
        setBusLocation: function (location) {
            this.busMarker.setLatLng(location).bindPopup(location.address);
            this.fitBoundsToUserAndBus();
        },
        displayUserLocation: function() {
            var map = this.map,
                userMarker = this.userMarker,
                context = this;

            this.map.on('locationfound', function (found) {
                var location = {
                    lat: found.latitude,
                    lng: found.longitude
                };

                userMarker.setIcon(icons.user).setLatLng(location).addTo(map);
                context.fitBoundsToUserAndBus();
            });

            this.map.locate();
        },
        fitBoundsToUserAndBus: function() {
            this.map.fitBounds([this.busMarker.getLatLng(), this.userMarker.getLatLng()]);
        },
        displayBusStops: function() {
            L.geoJson(stops, {
                onEachFeature: function (feature, layer) {
                    var stop = feature.properties,
                        popupText = "";

                    popupText += "Ponto " + stop.id + "-" + stop.direction + "</br>";
                    popupText += "" + stop.name + "</br>";
                    popupText += "" + stop.address + "</br>";
                    popupText += "Horário " + stop.time + "</br>";

                    layer
                        .setIcon(icons.stop)
                        .bindPopup(popupText);
                }
            }).addTo(this.map);
        }
    }
});
