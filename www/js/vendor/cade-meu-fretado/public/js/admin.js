function updateLocation () {
    require(["jquery"], function($) {
        navigator.geolocation.getCurrentPosition(function(location) {
            $.post("/location", {
                location: {
                    lat: location.coords.latitude, lng: location.coords.longitude
                }
            }, function (body) {
                $(".location").text(body.location.address);

                var staticMapUrl = "http://maps.googleapis.com/maps/api/staticmap"
                    + "?zoom=15&size=200x200&maptype=roadmap&sensor=false"
                    + "&center=" + body.location.lat + "," + body.location.lng
                    + "&markers=color:blue%7C" + body.location.lat + "," + body.location.lng;
                $(".map").show().attr("src", staticMapUrl);
            });
        });
    });
};

updateLocation();
window.setInterval(updateLocation, 30000);
