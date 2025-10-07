const { WebSocketServer } = require('ws');
const ws = new WebSocketServer({ port: 8015 });
// event handler
ws.on('connection', function (socket) {
    console.log(socket);
    setInterval(() => {
        socket.send('Reliance stock price is '+' '+ Math.random());
        
    }, 500);
    socket.in('message', function message(data) {
        console.log(data.tostring());
    
});