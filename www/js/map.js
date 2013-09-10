define(['leaflet'], function (L) {
    return {
        map: L.map('map'),
        marker: L.marker(),
        init: function(location) {
            this.map.setView(location, 16);

            L.tileLayer('http://{s}.maplink.com.br/tilegenerator/tile.ashx/?&x={x}&y={y}&zoom={z}', {
                subdomains: ['tile-map1', 'tile-map2', 'tile-map3', 'tile-map4'],
                attribution: '&copy; Map data <a href="http://www.maplink.com.br/">MapLink</a>'
            }).addTo(this.map);

            this.marker.setLatLng(location).addTo(this.map);
        },
        setLocation: function(location) {
            this.map.panTo(location);
            this.marker.setLatLng(location).bindPopup(location.address);
        }
    }
});
