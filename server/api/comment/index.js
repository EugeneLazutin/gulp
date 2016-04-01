var express = require('express');
var router = express.Router();
var comment = require('./comment');
var auth = require('../../services/auth/auth.service.js');

router.post('/', auth.isAuthenticated(), comment.create);

router.post('/set-removed', auth.isAuthenticated(true), comment.setRemoved);

router.post('/all', auth.isAuthenticated(true), comment.getAll);

module.exports = router;