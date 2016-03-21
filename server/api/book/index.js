var express = require('express');
var router = express.Router();
var book = require('./book');

router.post('/', book.create);

router.get('/', book.getAll);

module.exports = router;