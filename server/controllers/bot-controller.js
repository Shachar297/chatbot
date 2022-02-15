
const express = require('express'),
    botLogic = require('../logic/bot-logic'),
    router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        res.json(await botLogic.botMain());
    } catch (e) {
        return next(e);
    }
})

router.get('/:id/', async (req, res, next) => {
    const userId = req.params.id;
    try {
        res.json(await botLogic.botMain());
    } catch (e) {
        return next(e);
    }
})


router.post('/', async (req, res, next) => {
    const body = req.body.message;
    try {
        const stats = await botLogic.getMessages(body);
        console.log(stats)
        res.json(stats);
    } catch (e) {
        return next(e);
    }
})

router.post("/message/", async (req, res, next) => {
    const message = req.body.message;

    try {
        res.json(await botLogic.saveMessages(req, message));
    } catch (error) {
        return next(error);
    }
});

module.exports = router;


