const express = require('express')
    , bodyParser = require('body-parser')
    , path = require('path');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);


app.get('/', function(req, res){
    console.log(path.join(__dirname, '/index.html'))
    res.sendFile(path.join(__dirname, '/index.html'));
})

io.on('connection', function(socket) {
    console.log('a user connected', socket.id)

    socket.on('new message', function(message) {
        console.log('Message from react app: ', message)
        io.emit('get chat', message)
    })

    socket.on('disconnect', function() {
        console.log('User disconnected')
    })
})

const PORT = 3001;
http.listen(PORT, () => console.log(`Listening on port: ${PORT}`))