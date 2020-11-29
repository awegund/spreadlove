require('dotenv').config();
var fs = require('fs');
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
app.get('/', (req, res) => { res.send(200, 'Jetzt ist der Server auf HTTPS umgestellt!!') });








/*---------------------------------------------------------------------*/
https
    .createServer(credentials, app)
    .listen(8443, () => {
        console.log('HTTPS-Server up and running! :-)');
});