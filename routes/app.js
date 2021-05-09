var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/', function (req, res, next) {
    res.render('index');
});

router.get('/node-mongodb-mongoose-user', function (req, res, next){
    res.render('node');
});

router.post('/node-mongodb-mongoose-user', function (req, res, next){
    var emailVar = req.body.emailBody;
    var userObject = new User({
        firstName: 'Vinicius',
        lastName: 'Rosalen',
        password: "Segredo",
        email: emailVar
    });
    console.log(userObject);
    userObject.save();

    res.redirect('/node-mongodb-mongoose-user');
});

module.exports = router;

