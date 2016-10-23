// ROUTES FOR OUR API
// =============================================================================
var express = require('express');
var middleware = require('../middleware');
var api = express.Router();

// Import Models and Controllers
var User = require('../models/user');
var UserCtrl = require('../controllers/user');

api.route('/authenticate')
  .post(UserCtrl.authenticate);

api.route('/user')
  .get(middleware.ensureAuthenticated, UserCtrl.findAllUsers)
  .post(UserCtrl.addUser);

api.route('/user/:id')
  .get(middleware.ensureAuthenticated, UserCtrl.findById)
  .put(middleware.ensureAuthenticated, UserCtrl.updateUser)
  .delete(middleware.ensureAuthenticated, UserCtrl.deleteUser);


api.get('/private',middleware.ensureAuthenticated, function(req, res){
  var token = req.headers.authorization.split(" ")[1];
  res.json({
      message: 'Estás autenticado correctamente y tu _id es: '+req.user
  });
});

/*
api.get('/', function(req, res) {
    res.json({ message: 'Enhorabuena!!! Bienvenido a tu api!' });
});
*/

module.exports = api;
