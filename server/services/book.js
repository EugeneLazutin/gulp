var bookStore = require('../dal/book');
var toQuery = require('./search').toQuery;
var commentStore = require('../dal/comment');
var orderStore = require('../dal/order');
var orderService = require('./order');


exports.create = book => {
  book.available = book.count;

  return bookStore.create(book);
};

exports.getAll = params => {
  var query = toQuery(params.search);

  return bookStore.getAll(query, params.pagination);
};

exports.getBookWithComments = getBookWithComments;

exports.getBookWithCommentsAndOrders = id => {
  return new Promise((resolve, reject) => {
    getBookWithComments(id)
      .then(book => {
        orderStore
          .find({book: book._id})
          .then(orders => {
            book.orders = orders;
            resolve(book);
          })
          .catch(err => {
            reject(err);
          });
      })
      .catch(err => {
        reject(err);
      });
  });
};

exports.remove = id => {
  return bookStore.remove(id);
};

exports.availableBookCount = function (bookId) {
  return new Promise((resolve, reject) => {
    bookStore
      .get(bookId)
      .then(book => {

        orderService
          .activeOrderCount(bookId)
          .then(count => {
            resolve(book.count - count);
          })
          .catch(err => {
            reject(err);
          });

      })
      .catch(err => {
        reject(err);
      });
  });
};

function getBookWithComments(id) {
  return new Promise((resolve, reject) => {
    bookStore
      .get(id)
      .then(book => {

        orderService
          .activeOrderCount(id)
          .then(count => {

            commentStore
              .find({book: book._id})
              .then(comments => {
                var bookObj = book.toObject();
                bookObj.comments = comments;
                bookObj.available = bookObj.count - count;
                resolve(bookObj);
              })
              .catch(err => {
                reject(err);
              });

          })
          .catch(err => {
            reject(err);
          });

      })
      .catch(err => {
        reject(err);
      });
  });
}



