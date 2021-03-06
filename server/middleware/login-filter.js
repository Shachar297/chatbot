const expressJwt = require("express-jwt");
const config = require("../config/config").secret;
let {secret} = config;

function authenticateJwtRequestToken() {

    return expressJwt({
        secret,
        algorithms: ['HS256']
    }).unless({
        path: [
            "/users/",
            "/users/login/"
        ]
    })
}

module.exports = authenticateJwtRequestToken;