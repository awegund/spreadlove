const express           =  require('express');
const indexController   =  require('../controller/indexController');
const authController    =  require('../controller/authController');
const passport          =  require('passport');
// Multer must be added before CSURF in MW
const multer            = require('multer');
const storage           = multer.memoryStorage();
const upload            = multer({ storage: storage });
/*---------------------------------------------------------------------*/


const router = express.Router();

router
    .get('/',                               indexController.getIndex)           //HOME
    .get('/impressum',                      indexController.getImpressum)       //FOOTER
    .get('/dsgvo',                          indexController.getDSGVO)           //FOOTER
    .get('/3rdparty',                       indexController.get3rdparty)        //FOOTER
    // .get('/authentication/login',           authController.getLoginPage)        //Login
    .get('/authentication/login-github',    passport.authenticate('github'))
    .get('/authentication/auth-github',     passport.authenticate('github', { successRedirect: '/',
                                                                              failureRedirect: '/authentication/login-github' }))
    .get('/authentication/login-fb',        passport.authenticate('facebook'))
    .get('/authentication/auth-fb',         passport.authenticate('facebook', { failureRedirect: '/authentication/login-fb' }),
                                                                                    function(req, res) {
                                                                                        // Successful authentication, redirect home
                                                                                        res.redirect('/');
                                                                                    })
    .get('/authentication/getDBAdminView',  authController.getdbHandlingView)        
    .get('/authentication/register',        authController.getRegisterPage)
    .get('/authentication/resetPwd',        authController.getResetPWD)
    .get('/authentication/displayAllUsers', authController.getAllUsers)
    // .get('/raspberry/:id',                  );  //muss erst implementiert werden
    
    .post('/comment',                       indexController.postComment)                                //Kommentar erfassen und speichern
    .post('/addNewsArticle',                indexController.addNewsArticle)  //neuen News Artikel speichern
    .post('/authentication/login',          authController.postLogin)
    .post('/authentication/registerUser',   authController.postRegisterUser);

    
module.exports = router;