const { WebSocketServer } = require('ws');
const wss = new WebSocketServer({ port: 8888 });
const { v4: uuidv4 } = require('uuid');




let rooms = new Map();
// example (non-executable) room layout:
// {
//   "xyz": [s1, s2],
//   "1234": [s2, s3, s4]
// }

wss.on("connection", (socket)=>{
    console.log("User connected");
    socket.on("message", function(message){
          let parsedMessage = JSON.parse(message);
          let {type, payload} = parsedMessage;
            if(type == "join"){
                let {roomId} = payload;
                if(!rooms.get(roomId)){
                    rooms.set(roomId, new Set());
                }
                rooms.get(roomId).add(socket);
                console.log(rooms);
                socket.roomId = roomId;
                socket.send("added to room");

            }
            else if(type == "chat"){
                let {message} = payload;
                let {roomId} = socket;
                let allclients = rooms.get(roomId);
                allclients.forEach(s=>{
                    s.send(message);
                })
            }
            else if(type == "create"){
                let roomId = uuidv4();
                socket.send(JSON.stringify(
                    {
                        type: "created",
                        payload: {
                            roomId:roomId
                        }

                    }
                ))
            }
    });
})