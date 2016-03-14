var express = require('express');
var router = express.Router();

require('./local/passport.config');

router.use('/local', require('./local'));

module.exports = router;