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
app.get('/', (req, res) => { res.send(200, 'Now using HTTPS!!') });



//var httpsServer = https.createServer(credentials, app);
var httpServer  = http.createServer(app);




/*---------------------------------------------------------------------*/
// Server starten
httpServer.listen(8443, () => {
    console.log('HTTPS-Server up and running!');
});