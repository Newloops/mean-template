var mongoose = require('mongoose');
var User = mongoose.model('User');

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
        name: req.body.name,
        last_name: req.body.last_name
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
        user.last_name = req.body.last_name;

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
            res.status(200);
            console.log('Usuario eliminado!');
        })
    });
};
