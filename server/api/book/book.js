var handleError = require('../utils').handleError;
var bookService = require('../../services/book');

exports.create = function (req, res) {
  bookService
    .create(req.body)
    .then(book => {
      res.status(201).json(book);
    })
    .catch(err => {
      handleError(res, err);
    });
};

exports.getAll = function (req, res) {
  bookService
    .getAll(req.body)
    .then(books => {
      res.status(200).json(books);
    })
    .catch(err => {
      handleError(res, err);
    });
};

exports.getBook = function (req, res) {
  bookService
    .getBookWithComments(req.params.id)
    .then(book => {
      res.status(200).json(book);
    })
    .catch(err => {
      handleError(err);
    });
};

exports.getBookAdmin = function (req, res) {
  bookService
    .getBookWithCommentsAndOrders(req.params.id)
    .then(book => {
      res.status(200).json(book);
    })
    .catch(err => {
      handleError(err);
    });
};

exports.delete = function (req, res) {
  bookService
    .remove(req.params.id)
    .then(() => {
      res.status(200).send('Removed');
    })
    .catch(err => {
      handleError(res, err);
    });
};