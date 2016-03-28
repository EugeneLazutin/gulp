var express = require('express');
var router = express.Router();
var order = require('./order');
var auth = require('../../services/auth/auth.service.js');

router.post('/', auth.isAuthenticated(), order.makeOrder);

router.post('/take-order', auth.isAuthenticated(true), order.takeOrder);

module.exports = router;