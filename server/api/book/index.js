var express = require('express');
var router = express.Router();
var book = require('./book');
var auth = require('../../services/auth/auth.service.js');

router.post('/', book.create);

router.post('/all', book.getAll);

router.get('/:id', book.getBook);

router.delete('/:id', auth.isAuthenticated(true), book.delete);

module.exports = router;