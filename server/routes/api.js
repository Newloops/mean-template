// ROUTES FOR OUR API
// =============================================================================
var express = require('express');
var api = express.Router();

// Import Models and Controllers
var User = require('../models/user');
var UserCtrl = require('../controllers/user');

api.route('/user')
  .get(UserCtrl.findAllUsers)
  .post(UserCtrl.addUser);

api.route('/user/:id')
  .get(UserCtrl.findById)
  .put(UserCtrl.updateUser)
  .delete(UserCtrl.deleteUser);

/*
api.get('/', function(req, res) {
    res.json({ message: 'Enhorabuena!!! Bienvenido a tu api!' });
});
*/

module.exports = api;
