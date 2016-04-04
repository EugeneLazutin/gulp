var userStore = require('../dal/user');
var orderStore = require('../dal/order');
var toQuery = require('./search').toQuery;

var Book = require('../dal/models/book');

exports.create = (user) => {
  return userStore.create(user);
};

exports.get = (id) => {
  return userStore.get(id);
};

exports.getWithOrders = (id) => {
  return new Promise((resolve, reject) => {
    userStore
      .get(id)
      .then(user => {
        orderStore
          .find({user: id})
          .then(orders => {
            Book
              .populate(orders, {
                path: 'book',
                select: 'title author year'
              }, err => {
                if(err) {
                  reject(err);
                } else {
                  var userObj = user.toObject();
                  userObj.orders = orders;
                  resolve(userObj);
                }
              });
          })
          .catch(err => {
            reject(err);
          })
      })
      .catch(err => {
        reject(err);
      });
  })
};

exports.getAll = params => {
  var query = toQuery(params.search);

  return userStore.getAll(query, params.pagination);
};

exports.setBlocked = (id, blocked) => {
  var updates = {
    blocked: blocked
  };

  return new Promise((resolve, reject) => {
    userStore
      .update(id, updates)
      .then(() => {
        resolve(updates);
      })
      .catch(err => {
        reject(err);
      })
  });
};