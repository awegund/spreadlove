//const session = require("express-session");
const User     = require('../models/userModel');
const bcrypt   = require('bcryptjs');
const crypto   = require('crypto');
/*---------------------------------------------------------------------*/


 

/*-----------------------------------------------*
 *                  LOGIN
 *-----------------------------------------------*/
exports.getLoginPage = (req, res) => { 
    console.log('Login Session Status ----------------------------------------------');
    console.log(req.session);
    res.status(200);
    res.render('authentication/login', {
        name:       req.session.name,
        email:      req.session.email,
        password:   req.session.password
    }); 
}


exports.postLogin = (req, res) => {
    let hashPWD = bcrypt.hashSync(req.body.password, 12);
    // Daten in DB speichern
    User.create({
        email: req.body.email,
        password: hashPWD,
        name: req.body.name,
        locked: false
    }).then(result => {
        req.session.isLoggedIn = true;
        //Cross-Site Message mit Session weiterreichen 
        req.flash('message', 'The user has been created successfully!');
        
        if(req.body.remember_me) {
            req.session.name       = req.body.name;
            req.session.email      = req.body.email;
            req.session.password   = hashPWD;
        }
        //Redirect
        res.status(200);
        res.redirect('/');

    }).catch(err => {
        console.log('Fehler aufgetreten: ' + err);
    });
};


/*-----------------------------------------------*
 *                  PWD Reset
 *-----------------------------------------------*/
exports.getResetPWD = (req, res) => { 
    res.status(200);
    res.render('authentication/resetPwd', {
        email: req.session.email
    }); 
}

exports.postResetPWD = (req, res, next) => {
    crypto.randomBytes(32, (err, buff) => {
        if(err){
            console.log(err);
            res.redirect('/authentication/resetPwd');
        }
        const token = buff.toString('hex');
        User
            .findOne({ email: req.body.email })
            .then(user => {
                if(user){
                    user.resetToken       = token;
                    user.resetTokenExpiry = Date.now() + 3600000; //in Milli-Sekunden = 1h
                    return user.save()
                }
            })
            .then(user => {
                console.log('User mit Token gespeichert');
            })
            .catch(err => {

            })
    });
    
}