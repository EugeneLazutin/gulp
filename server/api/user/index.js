var express = require('express');
var router = express.Router();
var user = require('./user');
var auth = requireAbs('server/services/auth/auth.service.js');

router.get('/me', auth.isAuthenticated(), user.getMe);
router.post('/', user.create);

module.exports = router;