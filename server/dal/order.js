var Order = require('./models/order');
var factory = require('./dal.factory');


exports.create = factory.create(Order);

exports.getAll = factory.getAll(Order);

exports.update = factory.update(Order);

exports.multipleUpdate = function (query, updates) {
  return new Promise((resolve, reject) => {
    Order.update(query, updates, {multi: true}, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

exports.count = function (query) {
  return new Promise((resolve, reject) => {
    Order
      .count(query, (err, count) => {
        if (err) {
          return reject(err);
        }

        resolve(count);
      });
  });
};

exports.find = function (query) {
  return new Promise((resolve, reject) => {
    Order
      .find(query)
      .exec((err, orders) => {
        if (err) {
          return reject(err);
        }

        resolve(orders);
      });
  });
};