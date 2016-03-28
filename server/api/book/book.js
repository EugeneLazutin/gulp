var BookInfo = require('./book_info.model');
var handleError = require('../utils').handleError;
var search = require('../../services/search');
var _ = require('lodash');

exports.create = function (req, res) {
  BookInfo.create(req.body, function (err, bookInfo) {
    if (err) {
      return handleError(res, err);
    }
    res.status(201).json(bookInfo);
  });
};

exports.getAll = function (req, res) {
  var query = search.toQuery(req.body.search);

  BookInfo.paginate(query, req.body.pagination, function (err, docs) {
    if (err) {
      return handleError(res, err);
    }
    res.status(200).json(docs);
  });
};

exports.getBook = function (req, res) {
  var id = req.params.id;

  if (id) {
    BookInfo.findById(id, function (err, book) {
      if (err) {
        return handleError(res, err);
      }
      res.status(200).json(book);
    });
  } else {
    res.status(500).send('id required');
  }
};