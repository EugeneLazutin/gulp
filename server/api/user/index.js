var express = require('express');
var router = express.Router();
var user = require('./user');
var auth = require('../../services/auth/auth.service.js');

router.get('/me', auth.isAuthenticated(), user.getMe);

router.post('/', user.create);

router.post('/all', auth.isAuthenticated(true), user.getAll);

router.post('/set-blocked', auth.isAuthenticated(true), user.setBlocked);

router.get('/full/:id', auth.isAuthenticated(), user.fullInfo);

router.post('/change-role', auth.isAuthenticated(true), user.changeRole);

module.exports = router;