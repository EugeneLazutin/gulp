var Order = require('./models/order');


exports.create = function (order) {
  return new Promise(function (resolve, reject) {
    Order.create(order, function (err, createdOrder) {
      if (err) {
        return reject(err);
      }
      resolve(createdOrder);
    });
  });
};

exports.update = function (id, updates) {
  return new Promise(function (resolve, reject) {
    Order
      .findOneAndUpdate(id, updates)
      .exec(function (err, order) {
        if (err) {
          return reject(err);
        }

        resolve(order);
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