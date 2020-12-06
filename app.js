require('dotenv').config();
var fs = require('fs');
var http  = require('http');
var https = require('https');
var express = require('express');
/*---------------------------------------------------------------------*/

var PORT = process.env.PORT;

/*---------------------------------------------------------------------*/


var privateKey  = fs.readFileSync(__dirname + '/SSL/sawac.key', 'utf8');
var certificate = fs.readFileSync(__dirname + '/SSL/sawac.crt', 'utf8');
var credentials = { 
                    key:  privateKey, 
                    cert: certificate
                  };


var app = express();  
app.get('/', (req, res) => { 
    res.statusCode(200);
    res.setHeader('Content-Type', 'text/html');
    res.end(`{ "mesage": "Nun funktioniert es endlich!" }`); 
});



/*---------------------------------------------------------------------*/
//https
http.createServer(app)
//.createServer(credentials, app)
    .listen(PORT, () => { console.log(`HTTPS-Server up and running: https://${process.env.HOST} at port: ${process.env.PORT}`); })
    .on('uncauthException', (err) => { res.end( 'Fehler: ' + err ); });