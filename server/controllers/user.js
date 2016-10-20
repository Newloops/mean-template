var mongoose = require('mongoose');
var service = require('../service');
var User = mongoose.model('User');

//POST - Route to authenticate a user
exports.authenticate = function(req, res) {
    User.findOne({
        username: req.body.username
    }, function(err, user) {

        if (err) throw err;

        if (!user) {
            res.json({
                success: false,
                message: 'Authentication failed. User not found.'
            });
        } else if (user) {

            // check if password matches
            if (user.password != req.body.password) {
                res.json({
                    success: false,
                    message: 'Authentication failed. Wrong password.'
                });
            } else {
                console.log('POST /authenticate')
                    // return the information including token as JSON
                res.status(200).jsonp({
                    success: true,
                    user: user,
                    message: 'Enjoy your token!',
                    token: service.createToken(user)
                });
            }
        }
    });
};

//GET - Return all users in the DB
exports.findAllUsers = function(req, res) {
    User.find(function(err, users) {
        if (err) res.send(500, err.message);

        console.log('GET /users')
        res.status(200).jsonp(users);
    });
};

//GET - Return a User with specified ID
exports.findById = function(req, res) {
    User.findById(req.params.id, function(err, user) {
        if (err) return res.send(500, err.message);

        console.log('GET /user/' + req.params.id);
        res.status(200).jsonp(user);
    });
};

//POST - Insert a new User in the DB
exports.addUser = function(req, res) {
    console.log('POST');
    console.log(req.body);

    var user = new User({
        username: req.body.username,
        password: req.body.password
    });

    user.save(function(err, user) {
        if (err) return res.send(500, err.message);
        res.status(200).jsonp(user);
        console.log('Usuario creado!');
    });
};

//PUT - Update a register already exists
exports.updateUser = function(req, res) {
    User.findById(req.params.id, function(err, user) {
        user.name = req.body.petId;
        user.password = req.body.password;

        user.save(function(err) {
            if (err) return res.send(500, err.message);
            res.status(200).jsonp(user);
            console.log('Usuario actualizado!');
        });
    });
};

//DELETE - Delete a User with specified ID
exports.deleteUser = function(req, res) {
    User.findById(req.params.id, function(err, user) {
        user.remove(function(err) {
            if (err) return res.send(500, err.message);
            res.status(200).jsonp({ message: 'Usuario eliminado!'});
            console.log('Usuario eliminado!');
        })
    });
};
