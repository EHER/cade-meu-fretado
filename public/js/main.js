require.config({
    paths: {
        jquery: 'vendor/jquery/jquery.min'
    }
});

function getUpdatedLocation () {
    require(["jquery"], function($) {
        $.get("/location", function (data) {
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
};

getUpdatedLocation();
window.setInterval(getUpdatedLocation, 30000);
