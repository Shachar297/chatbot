const connection = require('./connection-wrapper'); 
// Connection wrapper is ignored by gitignore

async function register(userDetails) {
    let sql = "insert INTO users (username, password, phone_number) values (?,?,?)";
    let parameters = [userDetails.username, userDetails.password,userDetails.phoneNumber];
    let registerResult;

    try {
        registerResult = await connection.executeWithParameters(sql, parameters);
        return registerResult;
    } catch (e) {
        console.error(e);
        throw new Error(e);
    }

}

async function login(user) {
    let sql = "select * from users where username=? and password=?";
    console.log(user, "loginnnnnn")
    let parameters = [user.username, user.password];
    
    let userLoginResult;

    try {

        userLoginResult = await connection.executeWithParameters(sql, parameters);
        console.log(parameters)
    } catch (e) {
        throw new ServerError(errorType.GENERAL_ERROR, JSON.stringify(user), e);
    }
    if (userLoginResult == null || userLoginResult.length == 0) {
        throw new ServerError(errorType.UNAUTHORIZED);
    }

    return userLoginResult[0];
}



async function isUserExistByName(username) {
    let sql = "select * from users where username =?";
    let parameters = [username];
    let registeryResponse;
    try {
        registeryResponse = await connection.executeWithParameters(sql, parameters);

    } catch (e) {

        throw new ServerError(errorType.GENERAL_ERROR, JSON.stringify(username), e);
    }

    if (registeryResponse == null || registeryResponse.length == 0) {
        return false;
    }
    return true;
}
module.exports = {
    login,
    register,
    isUserExistByName

}