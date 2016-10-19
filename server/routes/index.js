// ROUTES FOR DEVELOPER FRONT
// =============================================================================
var express = require('express');
var router = express.Router();

/*
router.get('/', function(req, res) {
    //res.json({ message: 'hooray! welcome to our api!' });
    res.send("Hola Mundo!");
});
*/

// Carga una vista HTML simple donde irá nuestra Single App Page
// Angular Manejará el Frontend
router.get('/', function(req, res) {
    res.sendfile('./index.html');
});

module.exports = router;
