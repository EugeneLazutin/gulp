var bookStore = require('../dal/book');
var toQuery = require('./search').toQuery;
var commentStore = require('../dal/comment');
var orderStore = require('../dal/order');
var User = require('../dal/models/user');


exports.create = book => {
  book.available = book.count;

  return bookStore.create(book);
};

exports.decrementAvailable = id => {
  return changeAvailable(id, -1);
};

exports.incrementAvailable = id => {
  return changeAvailable(id, +1);
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
            User.populate(orders, {
              path: 'user',
              select: 'name'
            }, err => {
              if (err) {
                reject(err);
              } else {
                book.orders = orders;
                resolve(book);
              }
            })
          })
          .catch(err => {
            reject(err);
          })
      })
      .catch(err => {
        reject(err);
      })
  });
};

exports.remove = id => {
  return bookStore.remove(id);
};

function changeAvailable (id, value) {
  return new Promise((resolve, reject) => {
    bookStore
      .get(id)
      .then(book => {
        book.available += value;
        book.save(err => {
          if(err) {
            return reject(err);
          }
          resolve(book);
        })
      })
  });
}

function getBookWithComments(id) {
  return new Promise((resolve, reject) => {
    bookStore
      .get(id)
      .then(book => {
        commentStore
          .find({book: book._id})
          .then(comments => {
            User.populate(comments, {
              path: 'user',
              select: 'name'
            }, err => {
              if (err) {
                reject(err);
              } else {
                var bookObj = book.toObject();
                bookObj.comments = comments;
                resolve(bookObj);
              }
            });
          })
          .catch(err => {
            reject(err);
          })
      })
      .catch(err => {
        reject(err);
      })
  });
}



