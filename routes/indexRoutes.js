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
    .get('/',                               indexController.getIndex)
    .get('/impressum',                      indexController.getImpressum)
    .get('/dsgvo',                          indexController.getDSGVO)
    .get('/3rdparty',                       indexController.get3rdparty)
    .get('/authentication/login',           authController.getLoginPage)
    .get('/authentication/getAdminView',    authController.getAdminView)
    .get('/authentication/register',        authController.getRegisterPage)
    .get('/authentication/resetPwd',        authController.getResetPWD)
    .get('/authentication/displayAllUsers', authController.getAllUsers);
    // .get('/raspberry/:function',         isAuthenticated,                xxxx);  //muss erst implementiert werden


router
    .post('/authentication/login',          authController.postLogin)
    .post('/authentication/registerUser',   authController.postRegisterUser);

/*---------------------------------------------------------------------*
 *                         EXPORT                                      * 
 *---------------------------------------------------------------------*/
module.exports = router;