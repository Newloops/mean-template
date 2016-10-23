// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express'); // call express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express(); // define our app using express
var middleware = require('./server/middleware');
var service = require('./server/service');
var database = require('./server/config/database'); //Ruta de conexión con la base de datos

mongoose.connect(database.url, function(err, res) { // connect to our database
    if (err) {
        console.log('ERROR: No ha sido posible conectar con la base de datos. ' + err);
    }
});

app.use(express.static(__dirname)); //Define el index, que es el directorio raiz

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
//app.use(methodOverride());

var port = process.env.PORT || 8080; // set our port

// ROUTES
// =============================================================================

var index = require('./server/routes/index');
var api = require('./server/routes/api');

app.use('/', index); // Front controlado por Angular
app.use('/api', api); // Back controlado por Node y Mongo

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Node esta funcionando a traves de http://localhost: ' + port);
