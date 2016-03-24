var express = require('express');
var router = express.Router();
var book = require('./book');

router.post('/', book.create);

router.post('/all', book.getAll);

router.get('/:id', book.getBook);

module.exports = router;