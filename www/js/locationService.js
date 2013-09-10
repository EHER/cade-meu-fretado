define(['jquery'], function ($) {
    return {
        get: function (callback) {
            $.get("/location", function (body) {
                if (callback && typeof(callback) === "function") {
                    callback(body.location);
                }
            });
        },
        update: function (callback) {
            navigator.geolocation.getCurrentPosition(function(location) {
                $.post("/location", {
                    location: {
                        lat: location.coords.latitude, lng: location.coords.longitude
                    }
                }, function (body) {
                    if (callback && typeof(callback) === "function") {
                        callback(body.location);
                    }
                });
            });
        }
    }
});
