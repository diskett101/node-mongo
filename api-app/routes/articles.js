var exress = require('express');
var router = exress.Router();

router.get('/', function (req, res, next) {
    res.send("Test");
});

module.exports = router;