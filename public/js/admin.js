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
                console.log(data);
                document.getElementById("content").innerText = JSON.stringify(data);
            });
        });
    });
};

updateLocation();
window.setInterval(updateLocation, 30000);
