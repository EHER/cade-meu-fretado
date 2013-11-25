
var packageJson = require('./package.json');
var express = require('express');
var app = express();
var request = require('request');
var currentLocation = {lat:0, lng:0, address:'', lastUpdate: new Date()};
var port = process.env.PORT || 3000;
var mongo = require('mongodb');
var mongoUri = process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
    'mongodb://localhost/cadeofretado';

app.use(express.static('app'));
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

    request(revgeoUrl, function (err, response, body) {
        if (err) {
            console.warn(err.message);
        }

        var jsonResponse = JSON.parse(body);

        if (jsonResponse && jsonResponse.status === "OK") {
            currentLocation.address = jsonResponse.results[0].formatted_address;
        }

        mongo.Db.connect(mongoUri, function (err, db) {
            if (err) {
                console.warn(err.message);
                return;
            }
            db.collection('locations', function(er, collection) {
                if (err) {
                    console.warn(err.message);
                    return;
                }
                collection.insert({location: currentLocation}, {safe: true}, function(err, rs) {
                    if (err) {
                        console.warn(err.message);
                        return;
                    }
                });
            });
        });

        res.jsonp({location: currentLocation});
    });
});

app.get('/version', function(req, res) {
    res.jsonp({version: packageJson.version});
});

app.listen(port);
console.log("Version " + packageJson.version);
console.log("Listen on port " + port);

