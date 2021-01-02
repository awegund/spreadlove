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
const helmet         = require('helmet');
const logger         = require('morgan');
/*====*/
const passport       = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const FaceBookStrategy = require('passport-facebook');
const instagramStrategy = require('passport-instagram').Strategy;
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
    let redisUrl   = require("url").parse(process.env.REDIS_URL);
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
app.use(logger('dev'));
// Helmet for Sec-reasons
app.use(helmet());
// Parser
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false}));
// REDIS Session Store
app.use(session({
    name:              'SpreadLove.ONE',
    secret:            'Spr3adL0veS3ss10nSt0re',
    resave:             false,
    saveUninitialized:  true,
    // cookie: {
        //     maxAge: 3600
        // },
        store:         RedisStore
    }));
// Passport Authentication
app.use(passport.initialize());
app.use(passport.session());
passport.use(new GitHubStrategy({
        clientID:     process.env.GITHUB_CLIENTID,
        clientSecret: process.env.GITHUB_SECURE,
        callbackURL:  process.env.OAUTH_CB_URLL+'-github'
    },
    function(accessToken, refreshToken, profile, cb) {
        // console.log(profile);
        return cb(null, profile);
    }
));
passport.use(new FaceBookStrategy({
    clientID:     process.env.FB_CLIENTID,
    clientSecret: process.env.FB_SECURE,
    callbackURL:  process.env.OAUTH_CB_URL+'-FB'
},
    function(accessToken, refreshToken, profile, cb) {
        console.log('===== FB PROFILE =======================');
        console.log(profile);
        return cb(null, profile);
    }
));
passport.serializeUser((user, cb) => {
    cb(null, user);
});
passport.deserializeUser((user, cb) => {
        cb(null, user);
});
// FavIcon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// Remote IP-Address
app.use(requestIp.mw());

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
    if(req.user){
        res.locals.isLoggedIn = true;
        console.log(`User ${req.user.displayName} hat sich erfolgreich angemeldet!`);
    } else {
        res.locals.isLoggedIn = false;
        console.log(`Login: Anmeldung fehlgeschlagen!`);
    }
    res.locals.csrfToken  = req.csrfToken();
    next();
});

// Session --> save remote IP Address 
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
try {
    sequelize
        .authenticate()
        .then(result => {
            console.log('DB-connection established successfully!');
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