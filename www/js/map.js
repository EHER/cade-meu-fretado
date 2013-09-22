define(['leaflet'], function (L) {
    return {
        map: L.map('map'),
        busMarker: L.marker(),
        userMarker: L.circle(),
        init: function(location) {
            this.map.setView(location, 16);

            L.tileLayer('http://{s}.maplink.com.br/tilegenerator/tile.ashx/?&x={x}&y={y}&zoom={z}', {
                subdomains: ['tile-map1', 'tile-map2', 'tile-map3', 'tile-map4'],
                attribution: '&copy; Map data <a href="http://www.maplink.com.br/">MapLink</a>'
            }).addTo(this.map);

            this.busMarker.setLatLng(location).addTo(this.map);
        },
        setBusLocation: function(location) {
            this.map.panTo(location);
            this.busMarker.setLatLng(location).bindPopup(location.address);
        },
        displayUserLocation: function() {
            var map = this.map,
                userMarker = this.userMarker;


            this.map.on('locationfound', function (found) {
                var location = {
                    lat: found.latitude,
                    lng: found.longitude
                };

                var radius = found.accuracy / 2;
                userMarker.setLatLng(location).setRadius(radius).addTo(map);
            });
            this.map.locate();
        }
    }
});
