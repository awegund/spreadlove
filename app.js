require('dotenv').config();
var fs          = require('fs');
var http        = require('http');
var express     = require('express');
var bodyParser  = require('body-parser');
let publicRoutes = require('./routes/index');
/*---------------------------------------------------------------------*/


var app = express();  
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', 'views');

/*---------------------------------------------------------------------*
 *                         MIDDLEWARE                                  * 
 *---------------------------------------------------------------------*/

//  add bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


 app.use( (req, res, next) => {
    console.log('in Middleware');
    next();
});


/*---------------------------------------------------------------------*
 *                         ROUTES                                      * 
 *---------------------------------------------------------------------*/



 app.use(publicRoutes);

//  404
app.use((req, res, next) => {
    res.status(404).render({failureTitle: 'Fehler, Seite nicht gefunden!'});
});

/*---------------------------------------------------------------------*
 *                         START SERVER                                * 
 *---------------------------------------------------------------------*/
http.createServer(app)
    .listen(process.env.PORT, () => { 
        console.log(`HTTPS-Server up and running: https://${process.env.HOST} at port: ${process.env.PORT}`); 
    });