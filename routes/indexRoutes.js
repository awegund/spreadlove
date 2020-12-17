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
    .get('/',                        indexController.getIndex)
    .get('/authentication/login',    authController.getLoginPage)
    .get('/authentication/resetPwd', authController.getResetPWD);
    // .get('/raspberry/:function',     isAuthenticated,                xxxx);  //muss erst implementiert werden


router
    .post('/login',                 authController.postLogin);

/*---------------------------------------------------------------------*
 *                         EXPORT                                      * 
 *---------------------------------------------------------------------*/
module.exports = router;