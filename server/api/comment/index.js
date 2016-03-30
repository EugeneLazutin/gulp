var express = require('express');
var router = express.Router();
var comment = require('./comment');
var auth = require('../../services/auth/auth.service.js');

router.post('/', auth.isAuthenticated(), comment.create);

router.post('/block', auth.isAuthenticated(true), comment.block);

module.exports = router;