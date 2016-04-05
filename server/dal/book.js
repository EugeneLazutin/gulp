var Book = require('./models/book');
var factory = require('./helpers/dal.factory.js');


exports.create = factory.create(Book);

exports.getAll = factory.getAll(Book);

exports.update = factory.update(Book);

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