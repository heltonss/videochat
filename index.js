const getUserMedia = require('getusermedia');
var socket = require('socket.io-client')();

socket.on('connect', function () {
    console.log('usuário on line!')
});

getUserMedia({
    video: true,
    audio: false
}, function (err, stream) {

    const Peer = require('simple-peer');
    const peer = new Peer({
        initiator: location.hash === '#chat',
        trickle: false,
        stream: stream
    });

    var key;
    peer.on('signal', function (data) {
        document.getElementById('myId').value = JSON.stringify(data);
        key = data;
    });

    socket.on('key', function (msg) {
        console.log('vc recebeu a chave: ' + JSON.stringify(msg, null, ' '))
        key = msg
    })

    document.getElementById('connect').addEventListener('click', function () {
        // const otherId = JSON.parse(document.getElementById('otherId').value);
        console.log('resposta', JSON.stringify(key));
        peer.signal(key);
    })


    document.getElementById('open').addEventListener('click', function () {
        socket.emit('key', key);
    })

    document.getElementById('send').addEventListener('click', function () {
        const message = document.getElementById('message').value;
        peer.send(message)
    })

    peer.on('data', function (data) {
        document.getElementById('box-messages').textContent += data + '\n';
    })

    peer.on('stream', function (stream) {
        const video = document.getElementById('video');

        video.src = window.URL.createObjectURL(stream);
        video.play();
    })
})
