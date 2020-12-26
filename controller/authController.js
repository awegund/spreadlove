//const session = require("express-session");
const User     = require('../models/userModel');
const dbAdmin  = require('../models/db_admin');
const bcrypt   = require('bcryptjs');
const crypto   = require('crypto');
const { resolve } = require('path');
/*---------------------------------------------------------------------*/


 

/*-----------------------------------------------*
 *                  LOGIN
 *-----------------------------------------------*/
exports.getLoginPage = (req, res) => { 
    res.status(200);
    res.render('authentication/login', {
        name:       req.session.name,
        email:      req.session.email,
        password:   req.session.password
    }); 
}


exports.getRegisterPage = (req, res) => { 
    res.status(200);
    res.render('authentication/register', {
        name:       req.session.name,
        email:      req.session.email
    }); 
}


exports.postLogin = (req, res) => {
    User.findOne({ where: { email: req.body.email }})
        .then(UserModel => {
            let user = UserModel.get();
            console.log(user.password);

            if(bcrypt.compareSync(req.body.password, user.password)) {
                //Redirect
                res.status(200);
                res.redirect('/authentication/getAdminView');                    
            } else {
                console.log(err);
            }

        })
        .catch(err => {
            console.log('Error: ', err);
            //Cross-Site Message mit Session weiterreichen 
            req.flash('message', 'E-Mail or password does not exist!');
            //Redirect
            res.status(400);
            res.redirect('/');
        })
}


exports.postRegisterUser = (req, res) =>{
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
        res.redirect('/authentication/displayAllUsers');
    
    }).catch(err => {
        console.log('Fehler aufgetreten: ' + err);
    });
}


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


/*-----------------------------------------------*
 *                  ADMIN
 *-----------------------------------------------*/
exports.getAllUsers = (req, res) => {
    // Daten in DB speichern
    User.findAll({ where: { locked: false }})
        .then(allUsers => {

            console.log(allUsers);

            //Cross-Site Message mit Session weiterreichen 
            req.flash('message', 'User erfolgreich gelesen!');          
            //Redirect
            res.status(200);
            res.render('authentication/database/displayAllUsers', {
                allUsers: allUsers
            }); 

        }).catch(err => {
            console.log('User konnten nicht gelesen werden: ' + err);
        });
};


exports.getAdminView = (req, res) => {
    dbAdmin.dbTables
           .then(tables => {

                if(!tables){
                    //Cross-Site Message mit Session weiterreichen 
                    req.flash('message', 'Es konnten keine Tabellen geladen werden!');
                    //Redirect
                    res.status(400);
                    res.redirect('/');
                }
                dbAdmin.colAttributes(tables[0])
                       .then(tableAttributes => {

                            console.log('Attribs: --->>>> ', tableAttributes);

                            res.status(200);
                            res.render('authentication/database/database_admin', {
                                tables: tables,
                                tableAttributes: tableAttributes
                            }); 

                       })
                       .catch(err => {
                           console.log('Es konnten keine Tabellen-Atribute geladen werden: ', err);
                       })
            })
           .catch(err => {
                console.log('Tabellen konnten nicht geladen werden!!!', err);
           });

}