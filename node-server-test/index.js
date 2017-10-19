const http = require('http');
const fs = require('fs');
const path = require('path');

function send404Response(response) {
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.write('Error 404: Page not found!')
    response.end();
}

function handler(req, res) {
    if (req.method === 'GET' && req.url === '/') {
        console.log('html file request')
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream(__dirname + '/index.html').pipe(res);
    } else if (req.method === 'GET' && req.url === '/home.css') {
        console.log('Asking for css')
        res.writeHead(200, {'Content-Type': 'text/css'})
        fs.createReadStream(__dirname + '/home.css').pipe(res)
    } else {
        send404Response(res);
}
}

// function handler(req, res) {
//     console.log('Got request');
//     console.log(req.url);
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.write('My name is Joe!');
//     res.end();
// }

const server = http.createServer(handler);
const PORT = 4040;
server.listen(PORT, () => console.log(`Listening on port: ${PORT}`));