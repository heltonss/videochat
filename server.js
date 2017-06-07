const http = require('http');
const app = require('./config/express')();

http.createServer(app).listen(app.get('port'), function () {
    console.log('listening server in the port ' + app.get('port'));
});