// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var database = require('./server/config/database'); //Ruta de conexión con la base de datos

mongoose.connect(database.url, function(err, res) { // connect to our database
    if (err) {
        console.log('ERROR: No ha sido posible conectar con la base de datos. ' + err);
    }
});

app.use(express.static(__dirname)); //Define el index

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var User = require('./server/models/user');

var port = process.env.PORT || 8080; // set our port

// ROUTES
// =============================================================================

var index = require('./server/routes/index');
var api = require('./server/routes/api');

app.use('/', index);
app.use('/api', api);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Node esta funcionando a traves de http://localhost: ' + port);
