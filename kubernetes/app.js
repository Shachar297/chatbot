const
http = require('http'),
port = 8118;

var server = http.createServer(function(req, res) {
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end("Hello World");
});

server.listen(port);

console.log("Server listening on port " + port)