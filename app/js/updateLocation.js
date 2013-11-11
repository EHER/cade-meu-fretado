define(['jquery', 'locationService'], function ($, locationService) {
    return function() {
        locationService.update(function(location) {
            $(".location").text(location.address);

            require(['jquery.timeago.pt-br'], function () {
                $(".lastUpdate").timeago('update', location.lastUpdate);
            });

            var staticMapUrl = "http://maps.googleapis.com/maps/api/staticmap"
                + "?zoom=15&size=300x200&maptype=roadmap&sensor=false"
                + "&center=" + location.lat + "," + location.lng
                + "&markers=color:blue%7C" + location.lat + "," + location.lng;
            $(".map img").show().attr("src", staticMapUrl);
        });
    }
});
