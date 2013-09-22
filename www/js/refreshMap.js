define(['locationService', 'map'], function (locationService, map) {
    locationService.get(function(location) {
        map.init(location);
    });

    return function() {
        map.displayUserLocation();
        locationService.get(function(location) {
            map.setBusLocation(location);
        });
    };
});
