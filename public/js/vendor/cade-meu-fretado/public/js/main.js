function getUpdatedLocation () {
    require(["jquery"], function($) {
        $.get("/location", function (body) {
            $(".location").text(body.location.address);

            var staticMapUrl = "http://maps.googleapis.com/maps/api/staticmap"
                + "?zoom=15&size=200x200&maptype=roadmap&sensor=false"
                + "&center=" + body.location.lat + "," + body.location.lng
                + "&markers=color:blue%7C" + body.location.lat + "," + body.location.lng;
            $(".map").show().attr("src", staticMapUrl);
        });
    });
};

getUpdatedLocation();
window.setInterval(getUpdatedLocation, 30000);
