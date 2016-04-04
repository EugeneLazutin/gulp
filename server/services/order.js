var orderStore = require('../dal/order');
var orderStatus = require('../../config').orderStatus;
var orderAmount = require('../../config').orderAmount;
var bookService = require('./book');
var toQuery = require('./search').toQuery;


exports.create = (bookId, userId, userName, bookTitle) => {
  return new Promise((resolve, reject) => {
    bookService
      .availableBookCount(bookId)
      .then(count => {

        if(count > 0) {
          var startDate = new Date();
          var endDate = new Date();
          endDate.setDate(startDate.getDate() + orderAmount.booking);

          var order = {
            status: orderStatus.booked,
            book: bookId,
            bookTitle: bookTitle,
            date: {
              start: startDate,
              end: endDate
            },
            user: userId,
            userName: userName
          };

          orderStore
            .create(order)
            .then(createdOrder => {
              resolve(createdOrder);
            })
            .catch(err => {
              reject(err);
            });
        } else {
          reject(new Error('There is no available books.'));
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};

exports.giveOnHand = (id) => {
  var updates = {
    status: orderStatus.onHand,
    date: {
      start: new Date(),
      end: new Date()
    }
  };
  updates.date.end.setDate(updates.date.start.getDate() + orderAmount.lendOut);

  return update(id, updates);
};

exports.closeOrder = (orderId, status) => {
  var updates = {
    status: status
  };

  return update(orderId, updates);
};

exports.lostOrder = (orderId) => {
  var updates = {
    status: orderStatus.lost
  };

  return update(orderId, updates);
};

function update(id, updates) {
  return new Promise((resolve, reject) => {
    orderStore
      .update(id, updates)
      .then(() => {
        resolve(updates);
      })
      .catch(err => {
        reject(err);
      });
  });
}

exports.activeOrderCount = activeOrderCount;

function activeOrderCount(bookId) {
  return new Promise((resolve, reject) => {
    orderStore
      .count({
        book: bookId,
        status: {$in: [orderStatus.booked, orderStatus.onHand, orderStatus.lost]}
      })
      .then(count => {
        resolve(count);
      })
      .catch(err => {
        reject(err);
      });
  });
}

exports.getAll = params => {
  var query = toQuery(params.search);

  return orderStore.getAll(query, params.pagination);
};