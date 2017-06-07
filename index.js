const getUserMedia = require('getusermedia');

getUserMedia({
    video: true,
    audio: true
}, function (err, stream) {

    const Peer = require('simple-peer');
    const peer = new Peer({
        initiator: location.hash === '#chat',
        trickle: false,
        stream: stream
    });


    peer.on('signal', function (data) {
        document.getElementById('myId').value = JSON.stringify(data)
    });

    document.getElementById('connect').addEventListener('click', function () {
        const otherId = JSON.parse(document.getElementById('otherId').value);
        peer.signal(otherId);
    })

    document.getElementById('send').addEventListener('click', function () {
        const message = document.getElementById('message').value;
        peer.send(message)
    })

    peer.on('data', function (data) {
        document.getElementById('box-messages').textContent += data + '\n'
    })

    peer.on('stream', function (stream) {
        const video = document.getElementById('video');

        video.src = window.URL.createObjectURL(stream);
        video.play();
    })
})
