const {WebSocketServer} = require('ws');
const wss = new WebSocketServer({ port: 8888 });
let allsocket = [];

wss.on('connection', function (socket) {
    console.log('User connected');
    allsocket.push(socket);
    socket.on('message', function (message) {
        console.log('Received: ' + message.toString());
        if(message.toString() === "ping"){
            socket.send("pong");
        }
        
    });

});