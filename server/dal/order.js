var Order = require('./models/order');
var _ = require('lodash');


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
      .findById(id)
      .exec(function (err, order) {
        if (err) {
          return reject(err);
        }

        _.assign(order, updates);

        order.save(err => {
          if (err) {
            reject(err);
          } else {
            resolve(order);
          }
        });
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

exports.getAll = function (query, pagination) {
  return new Promise(function (resolve, reject) {
    Order.paginate(query, pagination, function (err, docs) {
      if (err) {
        return reject(err);
      }

      resolve(docs);
    });
  });
};