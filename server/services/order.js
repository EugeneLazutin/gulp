var orderStore = require('../dal/order');
var orderStatus = require('../../config').orderStatus;
var orderAmount = require('../../config').orderAmount;
var bookService = require('./book');


exports.create = (bookId, userId) => {
  var startDate = new Date();
  var endDate = new Date();
  endDate.setDate(startDate.getDate() + orderAmount[orderStatus.booked]);

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
  updates.date.end.setDate(updates.date.start.getDate() + orderAmount[orderStatus.onHand]);

  return orderStore.update(id, updates);
};

