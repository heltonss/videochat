const app = require('./config/express')();
const http = require('http');
var server = http.Server(app);
const io = require('socket.io')(server);

io.on('connection', function (socket) {
    console.log('usuário conectado');
    socket.on('key', function (msg) {
        console.log('essa é a chave >>>' + msg);
    })
})

server.listen(app.get('port'), function () {
    console.log('listening server in the port ' + app.get('port'));
});