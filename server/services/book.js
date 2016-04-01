var bookStore = require('../dal/book');
var toQuery = require('./search').toQuery;
var commentStore = require('../dal/comment');
var orderStore = require('../dal/order');


exports.create = book => {
  book.available = book.count;

  return bookStore.create(book);
};

exports.decrementAvailable = id => {
  return bookStore.addAvailable(id, -1);
};

exports.incrementAvailable = id => {
  return bookStore.addAvailable(id, +1);
};

exports.bookLost = id => {
  return bookStore.addCount(id, -1);
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

function getBookWithComments(id) {
  return new Promise((resolve, reject) => {
    bookStore
      .get(id)
      .then(book => {
        commentStore
          .find({book: book._id})
          .then(comments => {
            var bookObj = book.toObject();
            bookObj.comments = comments;
            resolve(bookObj);
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



