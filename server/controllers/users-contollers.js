var
usersLogic = require("../logic/users-logic"),
express = require("express"),
router = express.Router();

router.post("/" , async (req, res, next) => {
    const userDetails = req.body.user;

    try {
        res.json(await usersLogic.register(userDetails));
    } catch (error) {
        return next(error);
    }
});

router.post("/login/" , async (req, res, next) => {
    const userDetails = req.body.user;
    try {
        res.json(await usersLogic.login(userDetails));
    } catch (error) {
        return next(error);
    }
});

module.exports = router;