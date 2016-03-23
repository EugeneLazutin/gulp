var mongoose = require('mongoose');
var Book = require('./book.model');
var BookInfo = require('./book_info.model');
var handleError = require('../utils').handleError;

exports.create = function (req, res) {
  BookInfo.create(req.body, function (err, bookInfo) {
    if(err) {
      return handleError(res, err);
    }
    res.status(201).json(bookInfo);
  });
};

exports.getAll = function (req, res) {

  console.log(req.body);

  BookInfo.find(req.body, function (err, docs) {
    if(err) {
      return handleError(res, err);
    }
    res.status(200).json(docs);
  });
};