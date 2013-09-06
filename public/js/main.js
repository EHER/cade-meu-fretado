function getUpdatedLocation () {
    require(["jquery"], function($) {
        $.get("/location", function (body) {
            $(".location").text(body.location.address);

            var staticMapUrl = "http://maps.googleapis.com/maps/api/staticmap"
                + "?zoom=15&size=300x200&maptype=roadmap&sensor=false"
                + "&center=" + body.location.lat + "," + body.location.lng
                + "&markers=color:blue%7C" + body.location.lat + "," + body.location.lng;
            $(".map img").show().attr("src", staticMapUrl);
        });
    });
};

getUpdatedLocation();
window.setInterval(getUpdatedLocation, 30000);

Lungo.init({
    name: 'Cadê Meu Fretado',
    history: false
});
var pull = new Lungo.Element.Pull('#main-article', {
    onPull: "Pull down to refresh",
    onRelease: "Release to get new data",
    onRefresh: "Refreshing...",
    callback: function() {
        getUpdatedLocation();
        pull.hide();
    }
});
