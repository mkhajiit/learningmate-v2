const express = require("express");
const router = express.Router();
const db = require("../src/database");

//반드시 url 앞에 /빼먹지말것
router.get("/test/data", (req, res) => {
    const userId = req.session.userId;
    console.log(userId);
    db.query("SELECT * FROM users WHERE user_id=?", [userId])

        .then((result) => {
            res.json({
                message: "Hello from the server!",
                resdata: result[0][0],
            });
        })
        .catch((err) => {
            console.log(err);
        });
});

module.exports = router;