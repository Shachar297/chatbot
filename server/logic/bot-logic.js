
const botDao = require('../dao/bot-dao'),
userCached = require('../controllers/cache-controller');

async function botMain() {
    const example = await botDao.botMain();
    return example
}

async function getMessages(message) {
    const reply = handleMessage(message);
    const status = await botDao.getMessages(reply);
    return reply;
}

function handleMessage(message) {
    console.log(message);
    let reply;

    reply = isMathematic(message);
    if(reply) {
        return reply;
    }

    if(message.length < 2) {
        reply = "What should i do with this information ? ";
        return reply;
    }
    switch (message) {
        case "ABC" :
        reply = "ABC"
        break;

        case "123" :
            reply = "12345"
            break;


            default :
            reply = "I could't understand this. \n Can you try again?"
            break;
        }
        console.log(reply);
    return reply
}

function isMathematic(message) {
    let seperators = ["*" , "+" , "-" , "/"];
    if(message.indexOf("*") != -1 || message.indexOf("+") != -1 || message.indexOf("-") != -1 || message.indexOf("/") != -1) {
        return calcMathMessage(message, seperators)
    }

}

function calcMathMessage(message , seperators) {
        let divider;
        let calc;
    for(let seperator = 0; seperator < seperators.length; seperator ++) {
            if(message.indexOf(seperators[seperator]) != -1) {
                divider = seperators[seperator];
            }
    }
    message = message.split(divider);

    calc = eval(message[0] + divider + message[1]);
    return calc
}

async function saveMessages(request, message) {
    const user = userCached.extractUserDataFromCache(request);
    const userId = user.userId

    return await botDao.saveMessages(userId, message)
}

module.exports = {
    botMain,
    getMessages,
    saveMessages
}

