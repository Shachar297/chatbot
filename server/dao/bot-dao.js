const connection = require('./connection-wrapper');
// Connection wrapper is ignored by gitignore

async function botMain() {
    return 'completed'
}


async function getMessages(reply) {
    try {
        if (reply) {
            return reply;
        }
    } catch (e) {
        throw new Error(e);
    }
}


async function saveMessages(userId, message) {
    console.log(userId,message);
    let sql =
    `INSERT INTO messages (text, senderId, reciverId) values (?,?,?)`;
    let parameters = [message, userId, 0];
    try {
        const messageResponse = await connection.executeWithParameters(sql, parameters);
        return messageResponse
    } catch (error) {
        throw new Error(error);
    }
}
module.exports = {
    botMain,
    getMessages,
    saveMessages
}

