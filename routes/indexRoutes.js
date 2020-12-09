const express = require('express');
const indexController = require('../controller/indexController');
const authenticationController = require('../controller/authenticationController');
/*---------------------------------------------------------------------*/

const router = express.Router();


/*---------------------------------------------------------------------*
 *                         ROUTES                                      * 
 *---------------------------------------------------------------------*/

router
    .get('/', indexController.getIndex)
    .get('/authentication/login', authenticationController.getLoginPage);


router
    .post('/login', );

/*---------------------------------------------------------------------*
 *                         EXPORT                                      * 
 *---------------------------------------------------------------------*/
module.exports = router;