var fs = require('fs');
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
app.get('/', (req, res) => { res.send(200, 'Now using HTTPS!!') });



var httpsServer = https.createServer(credentials, app);




/*---------------------------------------------------------------------*/
// Server starten
httpsServer.listen(8443, () => {
    console.log('HTTPS-Server up and running!');
});