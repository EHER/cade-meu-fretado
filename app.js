var express = require('express');
var app = express();
var currentLocation = {lat:0, lng:0};

app.use(express.static('public'))
app.use(express.bodyParser());

app.get('/location', function(req, res) {
    res.jsonp(currentLocation);
});

app.post('/location', function(req, res) {
    if (!req.body.location.lat || !req.body.location.lng) {
        return res.send(400);
    }
    currentLocation = req.body.location;
    res.jsonp(currentLocation);
});

app.listen(3000);
console.log("Running...");

