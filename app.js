var packageJson = require('./package.json');
var express = require('express');
var app = express();
var request = require('request');
var currentLocation = {lat:0, lng:0, address:'', lastUpdate: new Date()};

app.use(express.static('www'));
app.use(express.bodyParser());

app.get('/location', function(req, res) {
    res.jsonp({location: currentLocation});
});

app.post('/location', function(req, res) {
    if (!req.body.location.lat || !req.body.location.lng) {
        return res.send(400);
    }

    currentLocation = {
        lat: req.body.location.lat,
        lng: req.body.location.lng,
        lastUpdate: new Date()
    };

    var revgeoUrl = "http://maps.googleapis.com/maps/api/geocode/json?latlng="
            + req.body.location.lat + "," + req.body.location.lng + "&sensor=false";

    request(revgeoUrl, function (error, response, body) {
        var data = JSON.parse(body);

        if (data && data.status === "OK") {
            currentLocation.address = data.results[0].formatted_address;
        }

        res.jsonp({location: currentLocation});
    });
});

app.get('/version', function(req, res) {
    res.jsonp({version: packageJson.version});
});

app.listen(process.env.PORT || 3000);
console.log("Running...");

