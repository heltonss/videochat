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


    peer.on('signal', function (data) {
        document.getElementById('myId').value = JSON.stringify(data);
        console.log(JSON.stringify(data, null, ' '));
    });

    document.getElementById('connect').addEventListener('click', function () {
        const otherId = JSON.parse(document.getElementById('otherId').value);
        peer.signal(otherId);
        console.log(JSON.stringify(otherId, null, ' '));
        socket.emit('key', JSON.stringify(otherId, null, ' '));
    })

    socket.on('key', function (msg) {
        console.log('vc recebeu a chave: ', msg);
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
