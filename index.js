'use strict'

var express = require('express');
var app = express();
const monumentJson = "https://geoweb.iau-idf.fr/agsmap1/rest/services/OPENDATA/OpendataDRAC/MapServer/4/query?where=1%3D1&outFields=*&outSR=4326&f=json"
const velibJson = "https://opendata.paris.fr/api/records/1.0/search/?dataset=velib-disponibilite-en-temps-reel&q=&rows=139&facet=name&facet=is_installed&facet=is_renting&facet=is_returning&facet=nom_arrondissement_communes"
const port = process.env.PORT || 3000;
var bodyParser = require('body-parser');

var fetch = require('node-fetch');
var https = require('https');
var cors = require('cors');
const { read } = require('fs');

var corsOptions = {
    origin: 'https://acanetti.github.io/BalanceTonJson/',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//app.options('*', cors()) // Enabling CORS Pre-Flight

//serves static files
app.use(express.static('docs'));


//ROUTES

/*
app.get("/:name", function(req, res) {
    res.send("hello : " + req.params.name);
})
*/

app.post("/fetchair/velib", cors(corsOptions), function(req, res) {
    //req.body.name
    console.log("radius", req.body.radius);
    let url = "https://opendata.paris.fr/api/records/1.0/search/?dataset=velib-disponibilite-en-temps-reel&q=&rows=139&facet=name&facet=is_installed&facet=is_renting&facet=is_returning&facet=nom_arrondissement_communes";
    fetch(url)
        .then(res => res.json())
        .then(json => {
            console.log("fetchair ok");
            res.send(json);
        });
})

app.get("/fetchair/velib", cors(corsOptions), function(req, res) {
    let url = "https://opendata.paris.fr/api/records/1.0/search/?dataset=velib-disponibilite-en-temps-reel&q=&rows=139&facet=name&facet=is_installed&facet=is_renting&facet=is_returning&facet=nom_arrondissement_communes";
    fetch(url)
        .then(res => res.json())
        .then(json => {
            console.log("velib ok");
            res.send(json);
        });
})

app.get("/fetchair/monuments", cors(corsOptions), function(req, res) {

    let url = "https://geoweb.iau-idf.fr/agsmap1/rest/services/OPENDATA/OpendataDRAC/MapServer/4/query?where=1%3D1&outFields=*&outSR=4326&f=json";
    fetch(url)
        .then(res => res.json())
        .then(json => {
            console.log("monuments ok");
            res.send(json);
        });
})

/* v2 pour fetch
app.get("/requestair/velib", function(req, res) {

    let url = velibJson;
    https.get(url, (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            console.log("requestair", JSON.parse(data));
            res.send("data requested look your console");
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
        res.send("nope request didnt work");
    });
})
*/

app.listen(port, function() {
    console.log('Serveur listening on port ' + port);
})