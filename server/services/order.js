var orderStore = require('../dal/order');
var orderStatus = require('../../config').orderStatus;
var orderAmount = require('../../config').orderAmount;
var bookService = require('./book');


exports.create = (bookId, userId) => {
  var startDate = new Date();
  var endDate = new Date();
  endDate.setDate(startDate.getDate() + orderAmount.booking);

  var order = {
    status: orderStatus.booked,
    book: bookId,
    date: {
      start: startDate,
      end: endDate
    },
    user: userId
  };

  return new Promise((resolve, reject) => {
    orderStore
      .create(order)
      .then(createdOrder => {
        bookService
          .decrementAvailable(bookId)
          .then(() => {
            resolve(createdOrder);
          })
          .catch(err => {
            createdOrder.remove();
            reject(err);
          });
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

exports.closeOrder = (orderId, bookId, status) => {
  var updates = {
    status: status
  };

  return new Promise((resolve,reject) => {
    update(orderId, updates)
      .then((result) => {
        bookService
          .incrementAvailable(bookId)
          .then(() => {
            resolve(result);
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

exports.lostOrder = (orderId, bookId) => {
  return new Promise((resolve, reject) => {
    var updates = {
      status: orderStatus.lost
    };

    bookService
      .bookLost(bookId)
      .then(() => {
        update(orderId, updates)
          .then(result => {
            resolve(result);
          })
          .catch(err => {
            reject(err);
          })
      })
      .catch(err => {
        reject(err);
      });
  });
};

function update(id, updates) {
  return new Promise((resolve, reject) => {
    orderStore
      .update(id, updates)
      .then(() => {
        updates._id = id;
        resolve(updates);
      })
      .catch(err => {
        reject(err);
      });
  });
}