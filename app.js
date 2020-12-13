require('dotenv').config();
var fs          = require('fs');
let path        = require('path');
var http        = require('http');
var bodyParser    = require('body-parser');
let favicon       = require('serve-favicon');
var express       = require('express');
var session       = require('express-session');
let redis         = require('redis');
/*---------------------------------------------------------------------*/
let publicRoutes     = require('./routes/indexRoutes');
let errorController  = require('./controller/errorController');
/*---------------------------------------------------------------------*/
let sequelize        = require('./models/establishPostgreConnection');
let userModel        = require('./models/userModel');
/*---------------------------------------------------------------------*/

console.log('INITIALIZATION OF APP HAS STARTED!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');



/*----------------------------------------*
 * REDIS: ESTABLISH SESSION-DB CONNECTION *
 *----------------------------------------*/
 if (process.env.REDIS_URL) {
    // inside if statement
    var rtg   = require("url").parse(process.env.REDIS_URL);
    let RedisStore = redis.createClient(rtg.port, rtg.hostname);
    RedisStore.auth(rtg.auth.split(":")[1]);
} else {
    var RedisStore = redis.createClient();
}

/*----------------------------------------*
 *       TEMPLATING ENGINE                *
 *----------------------------------------*/
var app = express();  
app.set('view engine', 'ejs');
app.set('views', 'views');

/*----------------------------------------*
 *       PARSERS & FAVICON                *
 *----------------------------------------*/
 app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// FavIcon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));





/*---------------------------------------------------------------------*
 *                    MIDDLEWARE BEFORE                                * 
 *---------------------------------------------------------------------*/
app.use( (req, res, next) => {
    console.log('befor Session MW ----------------------------------');
    console.log(req.session);
    next();
});

app.use(session({
    name:              'SpreadLove.ONE',
    secret:            'Spr3adL0veS3ss10nSt0re',
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
console.log('------------------------------------------------------------------------------');
console.log('Aufbau DB-Verbindung und Anlage Tabelle:');

try {
    sequelize
        .authenticate()
        .then(result => {
            console.log('Connection has been established successfully.');
            console.log(result);

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