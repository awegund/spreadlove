const session = require("express-session");
const User    = require('../models/userModel');


exports.getLoginPage = (req, res) => { 
    console.log('Login Session Status ----------------------------------------------');
    console.log(req.session.isLoggedIn);
    console.log(req.session.userEmail);
    console.log(req.session.password);
    res.status(200);
    res.render('authentication/login', {
        navLink1: req.session.name,
        name: req.session.name,
        email: req.session.email,
        password: req.session.password
    }); 
}


exports.postLogin = (req, res) => {
    // console.log('Ausgabe der Form Daten --------------------------------------------');
    // console.log('Name: '     + req.body.name, 
    //             'email: '    + req.body.email, 
    //             'password: ' + req.body.password);
    
    // Session speichern
    if(req.body.remember_me) {
        req.session.isLoggedIn = true;
        req.session.name       = req.body.name;
        req.session.email      = req.body.email;
        req.session.password   = req.body.password;
    }
    // Daten in DB speichern
    User.create({
        email: req.session.email,
        name: req.session.name,
        password: req.session.password,
        locked: false
    }).then(result => {
        res.status(200);
        res.redirect('/');

    }).catch(err => {
        console.log('Fehler aufgetreten: ' + err);
    });
};