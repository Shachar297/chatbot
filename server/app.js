
const 
express = require('express'),
cors = require('cors');

const
botController = require('./controllers/bot-controller'),
usersController = require('./controllers/users-contollers');

const server = express()

const port = process.env.PORT || 4321

server.use(express.static("public"));
server.use("/css", express.static(__dirname + "/public/css"));
server.use("/js", express.static(__dirname + "/public/js"));

console.log("Frontend loaded");

server.use(cors({ origin : '*'}));

server.use(express.json());

server.use('/bot', botController);
server.use('/users', usersController);

server.listen(port, () => console.log('Server is running at port ' + port));

