const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

server.listen(3000);

app.get('/', function(request, respons) {
    respons.sendFile(`${__dirname}/index.html`);
});

connections = [];

io.sockets.on('connection', function(socket) {
    console.log("LOG: successful new connection");
    connections.push(socket);
    console.log(`LOG: current number of chat users ${connections.length}`);

    socket.on('disconnect', function() {
        connections.splice(connections.indexOf(socket), 1);
        console.log("LOG: successful disconnection");
        console.log(`LOG: current number of chat users ${connections.length}`);
    });

    socket.on('send message', function(data) {
        console.log(`LOG: got new message from ${data.name}`);

        io.sockets.emit(
            'add message',
            {
                message: data.message,
                name: data.name,
                color: data.color,
                time: data.time
            });
    });

});
