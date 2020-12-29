const express = require('express');
const indexController = require('../controller/indexController');
const authController = require('../controller/authController');
const isAuthenticated = require('../authMiddleware/is-auth');
/*---------------------------------------------------------------------*/


const router = express.Router();

/*---------------------------------------------------------------------*
 *                         ROUTES                                      * 
 *---------------------------------------------------------------------*/

router
    .get('/',                               indexController.getIndex)           //HOME
    .get('/impressum',                      indexController.getImpressum)       //FOOTER
    .get('/dsgvo',                          indexController.getDSGVO)           //FOOTER
    .get('/3rdparty',                       indexController.get3rdparty)        //FOOTER
    .get('/authentication/login',           authController.getLoginPage)        //Login
    .get('/authentication/getAdminView',    authController.getAdminView)        
    .get('/authentication/register',        authController.getRegisterPage)
    .get('/authentication/resetPwd',        authController.getResetPWD)
    .get('/authentication/displayAllUsers', authController.getAllUsers);
    // .get('/raspberry/:function',         isAuthenticated,                xxxx);  //muss erst implementiert werden
    
    
router
    .post('/comment',                       indexController.postComment)        //Kommentar erfassen und speichern
    .post('/authentication/login',          authController.postLogin)
    .post('/authentication/registerUser',   authController.postRegisterUser);

/*---------------------------------------------------------------------*
 *                         EXPORT                                      * 
 *---------------------------------------------------------------------*/
module.exports = router;