require('dotenv').config();
var fs          = require('fs');
let path        = require('path');
var http        = require('http');
var bodyParser  = require('body-parser');
let favicon     = require('serve-favicon');
var express     = require('express');
var session     = require('express-session');
// var RedisStore  = require('redis').createClient(process.env.REDIS_URL);
/*---------------------------------------------------------------------*/
let publicRoutes = require('./routes/indexRoutes');
let errorController = require('./controller/errorController');
/*---------------------------------------------------------------------*/


// Template Engine
var app = express();  
app.set('view engine', 'ejs');
app.set('views', 'views');

//  add bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// FavIcon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// Redis Session Store
if (process.env.REDIS_URL) {
    // inside if statement
    var rtg   = require("url").parse(process.env.REDIS_URL);
    var redis = require("redis").createClient(rtg.port, rtg.hostname);
    redis.auth(rtg.auth.split(":")[1]);
    
} else {
    var redis = require("redis").createClient();
}


/*---------------------------------------------------------------------*
 *                    MIDDLEWARE BEFORE                                * 
 *---------------------------------------------------------------------*/
app.use( (req, res, next) => {
    console.log('in Middleware right befor Session-Cookies');
    next();
});

app.use(session({
    secret:            'ThisIsTheSpreadLoveSessionCookie',
    store:              redis,
    resave:             false,
    saveUninitialized:  false,
    cookie: {
        maxAge: 3600
    }
}));

/*---------------------------------------------------------------------*
 *                         ROUTES                                      * 
 *---------------------------------------------------------------------*/
 app.use(publicRoutes);


/*---------------------------------------------------------------------*
 *                    MIDDLEWARE AFTER                                 * 
 *---------------------------------------------------------------------*/
//  404 - Site not found!
app.use(errorController.get404Page);


/*---------------------------------------------------------------------*
 *                         START SERVER                                * 
 *---------------------------------------------------------------------*/
http.createServer(app)
    .listen(process.env.PORT, () => { 
        console.log(`HTTPS-Server up and running: https://${process.env.HOST} at port: ${process.env.PORT}`); 
    });