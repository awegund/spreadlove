require('dotenv').config();
var fs = require('fs');
var http  = require('http');
var https = require('https');
var express = require('express');
/*---------------------------------------------------------------------*/


var privateKey  = fs.readFileSync(__dirname + '/SSL/sawac.key', 'utf8');
var certificate = fs.readFileSync(__dirname + '/SSL/sawac.crt', 'utf8');
var credentials = { 
                    key:  privateKey, 
                    cert: certificate
                  };


var app = express();  
app.get('/', (req, res) => { 
    res.status(200);
    res.setHeader('Content-Type', 'text/html');
    res.end("<H1 style='background-color:blue;color:white'>Iscchhhh liiieeebbb DIIIRRRR!!!</H1>"); 
});



/*---------------------------------------------------------------------*/
//https
http.createServer(app)
//.createServer(credentials, app)
    .listen(process.env.PORT, () => { console.log(`HTTPS-Server up and running: https://${process.env.HOST} at port: ${process.env.PORT}`); })
    .on('uncauthException', (err) => { res.end( 'Scheißßeeee Fehler!!!!!!!!!!!!!!!!!! ' + err ); });