require.config({
    paths: {
        jquery: 'vendor/jquery/jquery.min'
    }
});

function updateLocation () {
    require(["jquery"], function($) {
        navigator.geolocation.getCurrentPosition(function(location) {
            $.post("/location", {
                location: {
                    lat: location.coords.latitude, lng: location.coords.longitude
                }
            }, function (data) {
                $.get("http://maps.googleapis.com/maps/api/geocode/json?latlng="+
    data.lat+","+data.lng+"&sensor=false", function(data) {
                    var address = "";
                    if (data && data.status === "OK") {
                        address = data.results[0].formatted_address;
                    }
                    document.getElementById("content").innerText = address;
                });
            });
        });
    });
};

updateLocation();
window.setInterval(updateLocation, 30000);
