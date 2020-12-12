require('dotenv').config();
var fs          = require('fs');
let path        = require('path');
var http        = require('http');
var bodyParser  = require('body-parser');
let favicon     = require('serve-favicon');
var express     = require('express');
var session     = require('express-session');
let redis       = require('redis');
/*---------------------------------------------------------------------*/
let publicRoutes = require('./routes/indexRoutes');
let errorController = require('./controller/errorController');
/*---------------------------------------------------------------------*/

console.log('Start GAAAAAAAAAANNNNNNNNNNNNZZZZZZZZZZZZZ OBBEEEENNNNNN');



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
    var RedisStore = redis.createClient(rtg.port, rtg.hostname);
    RedisStore.auth(rtg.auth.split(":")[1]);
} else {
        var RedisStore = redis.createClient();
}


/*---------------------------------------------------------------------*
 *                    MIDDLEWARE BEFORE                                * 
 *---------------------------------------------------------------------*/
app.use( (req, res, next) => {
    console.log('befor Session MW ----------------------------------');
    console.log(req.session);
    next();
});

app.use(session({
    secret:            'Spr3adL0veS3ss10nSt0re',
    name:              'SpreadLoveSession',
    resave:             false,
    saveUninitialized:  false,
    cookie: {
        maxAge: 3600
    },
    store:              RedisStore
}));


/*---------------------------------------------------------------------*
 *                         ROUTES                                      * 
 *---------------------------------------------------------------------*/
 app.use(publicRoutes);


/*---------------------------------------------------------------------*
 *                    MIDDLEWARE AFTER                                 * 
 *---------------------------------------------------------------------*/
app.use((req, res, next) => {
    //nach den Routs MW
    console.log('nach Routes MW ----------------------------------')
    console.log(req.session);
    next();
})

 //  404 - Site not found!
app.use(errorController.get404Page);


/*---------------------------------------------------------------------*
 *                         START SERVER                                * 
 *---------------------------------------------------------------------*/
http.createServer(app)
    .listen(process.env.PORT, () => { 
        console.log(`HTTPS-Server up and running: https://www.${process.env.HOST}:${process.env.PORT}`); 
    });