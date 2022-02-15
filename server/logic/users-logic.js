const usersDao = require('../dao/users-dao'),
saltRight = "AGT553#gfhgdfhhdshfd!(9",
saltLeft = "@@abc6sfdgfghjhfdasde788S",
config = require("../config/config"),
crypto = require("crypto"),
jwt = require("jsonwebtoken"),
userCache = require("../controllers/cache-controller");

async function register(userDetails) {
    if(await usersDao.isUserExistByName(userDetails.username)) {
        throw new Error("User already exists");
    }
    userDetails.password = crypto.createHash("md5").update(saltLeft + userDetails.password + saltRight).digest("hex");

    let userRegisterdata = await usersDao.register(userDetails);
    const token = jwt.sign({ sub: saltLeft + userDetails.username + saltRight }, config.secret);
    userDetails.id = userRegisterdata.insertId;
    userCache.put(token, userDetails);
    return { token: "Bearer " + token};
}

async function login(user) {
    user.password = crypto.createHash("md5").update(saltLeft + user.password + saltRight).digest("hex");
    let userLoginData = await usersDao.login(user);

    const token = jwt.sign({ sub: saltLeft + user.username + saltRight }, config.secret);
    userCache.put(token, userLoginData);

    return { token: "Bearer " + token, userType: userLoginData.user_type };
}


module.exports = {
    register,
    login,
    register
}