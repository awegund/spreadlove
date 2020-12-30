require('dotenv').config();
let fs            = require('fs');
let path          = require('path');
let http          = require('http');
let bodyParser    = require('body-parser');
let favicon       = require('serve-favicon');
/*---------------------------------------------------------------------*/
let express       = require('express');
let session       = require('express-session');
let redis         = require('redis');
/*---------------------------------------------------------------------*/
let sequelize        = require('./models/establishPostgreConnection');
/*---------------------------------------------------------------------*/
let csrf             = require('csurf');    //Cross Site Request Forgeing Protection
const csrfProtection = csrf();
/*---------------------------------------------------------------------*/
const flash          = require('connect-flash');   //Info-Error-Warning Handling via Session
/*---------------------------------------------------------------------*/
const requestIp      = require('request-ip');
/*---------------------------------------------------------------------*/
let publicRoutes     = require('./routes/indexRoutes');
let errorController  = require('./controller/errorController');
/*---------------------------------------------------------------------*/



/*----------------------------------------*
 * REDIS: ESTABLISH SESSION-DB CONNECTION *
 *----------------------------------------*/
 if (process.env.REDIS_URL) {
    let redisUrl        = require("url").parse(process.env.REDIS_URL);
    let RedisStore = redis.createClient(redisUrl.port, redisUrl.hostname);
    RedisStore.auth(redisUrl.auth.split(":")[1]);
} else {
    var RedisStore = redis.createClient();
}


/*----------------------------------------*
 *       TEMPLATING ENGINE                *
 *----------------------------------------*/
var app = express();  
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public', 'views'));



/*----------------------------------------*
 *       MW REGISTRATIONS                 *
 *----------------------------------------*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


// FavIcon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// Remote IP-Address
app.use(requestIp.mw());

// REDIS Session Store
app.use(session({
    name:              'SpreadLove.ONE',
    secret:            'Spr3adL0veS3ss10nSt0re',
    resave:             false,
    saveUninitialized:  false,
    // cookie: {
        //     maxAge: 3600
        // },
        store:              RedisStore
    }));
    
    // CSRF Protection (AFTER Session!)
    app.use(csrfProtection);       // for all POST-Requests a CSRF-Token MUST be existing!
    // FLASH: Cross-Site Info/Warning/Error (AFTER Session!)
    app.use(flash());



/*---------------------------------------------------------------------*
 *                    MIDDLEWARE BEFORE                                * 
 *---------------------------------------------------------------------*/
// LOCALS for Views
 app.use( (req, res, next) => {
    // Locals that are available in the Views only
    res.locals.isLoggedIn = req.session.isLoggedIn;
    res.locals.csrfToken  = req.csrfToken();
    res.locals.remoteIP   = req.clientIp;
    
    next();
});

// remote IP Address 
app.use( (req, res, next) => {
    req.session.remoteIP = req.clientIp;  
    next();
})


/*---------------------------------------------------------------------*
 *                         ROUTES                                      * 
 *---------------------------------------------------------------------*/
 app.use(publicRoutes);


/*---------------------------------------------------------------------*
 *                    MIDDLEWARE AFTER                                 * 
 *---------------------------------------------------------------------*/
app.use((req, res, next) => {

    next();
})

 //  404 - Site not found!
app.use(errorController.get404Page);


/*---------------------------------------------------------------------*
 *                         START SERVER                                * 
 *---------------------------------------------------------------------*/
console.log('------------------------------------------------------------------------------');
console.log('Aufbau DB-Verbindung:');
try {
    sequelize
        .authenticate()
        .then(result => {
            console.log('Connection has been established successfully!');
            // DB Sync
            sequelize.sync()
                    .then(result => {
                        http.createServer(app).listen(process.env.PORT, () => { 
                                console.log(`HTTP-Server up and running: https://www.${process.env.HOST}:${process.env.PORT}`); 
                            });
                        
                    }).catch(err => {
                        sequelize.close();
                    });  
                })
        .catch(err => {
            console.log(err);
        });

} catch (error) {
  console.error('Unable to connect to the database:', error);
}