console.log("socket")

const
    express = require('express'),
    http = require("http"), // More basic server than express.
    socketIO = require("socket.io"),
    expressServer = express(),
    httpServer = http.createServer(expressServer), // Need express
    socketServer = socketIO(httpServer, {
        cors: {
            origin: "*"
        }
    }),
    userCache = require('./cache-controller'),
    socketPort = process.env.PORT || 4322;

let userIdToSocketsMap = new Map();

socketServer.sockets.on("connection", socket => {
    console.log("Connection request");
    var handshakeData = socket.request;
    let token = handshakeData._query['token'].substring("bearer ".length);
    let userData = userCache.get(token);
    let userId = userData.id;

    console.log("User id: " + token);
    userIdToSocketsMap.set(userId, socket);

    console.log("One client has been connected... Total clients: " + userIdToSocketsMap.size);


    // 7. When user disconnects: 
    socket.on("disconnect", () => {
        var handshakeData = socket.request;
        let token = handshakeData._query['token'].substring("bearer ".length);
        console.log(token)
        let userData = userCache.get(token);
        let userId = userData.id;

        userIdToSocketsMap.delete(userId);
        console.log(userId + " client has been disconnected. Total clients: " +
            userIdToSocketsMap.size);
    });

});

console.log(socket, "socket")

httpServer.listen(socketPort, () => console.log("Socket Listening... on port " + socketPort));


async function asyncBroadcast(event, senderId) {
    for ([userId, socket] of userIdToSocketsMap) {
        if (senderId != userId) {
            socket.emit(event.eventType, event.parameters);
        }
    }
}

socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });
console.log("Socket entry")

module.exports = {
    asyncBroadcast,
    httpServer
}