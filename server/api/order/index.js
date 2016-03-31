var express = require('express');
var router = express.Router();
var order = require('./order');
var auth = require('../../services/auth/auth.service.js');

router.post('/', auth.isAuthenticated(), order.makeOrder);

router.post('/lend-out', auth.isAuthenticated(true), order.takeOrder);

router.post('/close', auth.isAuthenticated(true), order.closeOrder);

module.exports = router;