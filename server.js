// server.js
'use strict'

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var api = require('./api');

var app = express();
var router = express.Router();

var port = process.env.API_PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//To prevent errors from Cross Origin Resource Sharing, we will set 
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  //and remove cacheing so we get the most recent comments
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

router.get('/', function(req, res) {
  // console.log("HELLO");
  // res.json({ message: 'API initialized!' });
  res.json({ message: api.getZillowApiKey() })
});

router.route('/lookup').get(function(req, res) {
  console.log("Loading locations...");

  if(!req.body) console.log("No body");

  var city = req.body["city"];
  var dist = req.body["dist"];

  // Default accepted distance to 20 miles away from
  // target city
  if(!dist)
    dist = 20;

  console.log("dist = " + dist);

  return(api.getLatLong(_GG_API_KEY, city).then(function(locResponse) {
    // console.log(JSON.stringify(locResponse));
    var latLong = locResponse["GeocodeResponse"].result[0]["geometry"][0]["location"];
    // console.log(latLong);
    var latLongObj = {};
    latLongObj.latitude = latLong[0]["lat"];
    latLongObj.longitude = latLong[0]["lng"];

    var address = locResponse["GeocodeResponse"].result[0]["formatted_address"][0];
    
    // Figure out what state we're looking at.
    // By default, we're going to look for CITIES
    // near the target city/county/neighborhood.
    var addrList = address.split(',');
    var state = addrList[addrList.length - 2];
    var stateList = state.split(" ");

    var regionResponse = api.getRegionChildren(_Z_API_KEY, stateList[1]);
    regionResponse.then(function(regResponse) {
      var geo = require('geolib');
      // console.log("\n\n\n\n\n\n");

      // Check if we made a successful request - this should always be populated.
      var status = regResponse["RegionChildren:regionchildren"]["message"][0]["code"];
      // console.log("CODE = " + status);
      
      // User entered something we don't have data for.
      if(status > 0){
        res.send("Empty response!  Check that you're entering a valid city/county/neighborhood!")
        return("Error");
      }

      var subResponse = regResponse["RegionChildren:regionchildren"]["response"][0]["list"];
      var regionList = subResponse[0]["region"];
      // console.log(JSON.stringify(regionList));
      
      var finalCities = [];
      for(var i = 0; i < regionList.length; ++i) {
        var currLat = regionList[i]["latitude"];
        var currLng = regionList[i]["longitude"];
        var currLatLong = {latitude: currLat, longitude: currLng};

        var distance = geo.getDistance(latLongObj, currLatLong);
        var miles    = geo.convertUnit("mi", distance, 5);

        // console.log("MILES = " + miles);
        // console.log(JSON.stringify(regionList[i]) + "\n\n");
        if(miles < dist)
          finalCities.push(regionList[i]);
      }

      res.send(finalCities);
    },
    function(ggError) {
      console.log("ggError = " + ggError);
    });

    // var geo = require('geolib');
    // var subResponse = response["RegionChildren:regionchildren"]["response"][0]["list"];
  
    // var regionList = subResponse[0]["region"];
    // for(var i = 0; i < regionList.length; ++i) {
    //   console.log(JSON.stringify(regionList[i]) + "\n\n");
    // }
    // console.log(JSON.stringify(subResponse[0]["region"][0]));
  },
  function(error) {
    console.log("Err1 = " + error);
  }));
});

app.use('/api', router);

//starts the server and listens for requests
app.listen(port, function() {
  console.log(`api running on port ${port}`);
});