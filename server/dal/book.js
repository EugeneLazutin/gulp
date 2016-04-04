var Book = require('./models/book');
var _ = require('lodash');


exports.create = function (book) {
  return new Promise(function (resolve, reject) {
    Book.create(book, function (err, createdBook) {
      if (err) {
        return reject(err);
      }

      resolve(createdBook);
    });
  });
};

exports.getAll = function (query, pagination) {
  return new Promise(function (resolve, reject) {
    Book.paginate(query, pagination, function (err, docs) {
      if (err) {
        return reject(err);
      }

      resolve(docs);
    });
  });
};

exports.get = function (id) {
  return new Promise(function (resolve, reject) {
    Book
      .findById(id)
      .exec(function (err, book) {
        if (err) {
          return reject(err);
        }

        if (!book) {
          return reject(new Error('Book not found'));
        }

        resolve(book);
      });
  });
};

exports.remove = function (id) {
  return new Promise(function (resolve, reject) {
    Book
      .remove({_id: id}, function (err) {
        if (err) {
          throw err;
        }

        resolve();
      });
  });
};

exports.update = function (id, updates) {
  return new Promise(function (resolve, reject) {
    Book
      .findById(id)
      .exec(function (err, book) {
        if (err) {
          return reject(err);
        }

        _.assign(book, updates);

        book.save(err => {
          if (err) {
            reject(err);
          } else {
            resolve(book);
          }
        });
      });
  });
};