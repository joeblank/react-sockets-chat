const express = require('express')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , path = require('path');

const app = express();
app.use(cors())
const http = require('http').Server(app);
const io = require('socket.io')(http);


// app.get('/', function(req, res){
//     console.log(path.join(__dirname, '/index.html'))
//     res.sendFile(path.join(__dirname, '/index.html'));
// })

app.get('/test', function(req, res) {
    console.log('things are coming from da front')
})
var chat = io.of('/main-socket')
  chat.on('connection', function(socket) {
    console.log('a user connected', socket.id)
    chat.emit('hi', 'people')
    socket.on('new message', function(message) {
        console.log('Message from react app: ', message)
        chat.emit('get chat', message)
    })

    socket.on('disconnect', function() {
        console.log('User disconnected')
    })
})
var test = io.of('/test')
  test.on('connection', function(socket) {
    console.log('user connected to /test')

    socket.on('new message', function(message) {
        console.log('Message from react app (test): ', message)
        test.emit('get chat for test', message)
    })

    socket.on('disconnect', function() {
        console.log('User disconnected from /test')
    })
  })


const PORT = 3001;
http.listen(PORT, () => console.log(`Listening on port: ${PORT}`))