define(['locationService', 'map'], function (locationService, map) {
    locationService.get(function(location) {
        map.init(location);
    });

    return function() {
        locationService.get(function(location) {
            map.setLocation(location);
        });
    };
});
