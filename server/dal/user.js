var User = require('./models/user');
var _ = require('lodash');


exports.create = function (user) {
  return new Promise(function (resolve, reject) {
    User.create(user, function (err, createdUser) {
      if (err) {
        return reject(err);
      }
      resolve(createdUser);
    });
  });
};

exports.get = function (id) {
  return new Promise(function (resolve, reject) {
    User
      .findById(id)
      .exec(function (err, user) {
        if (err) {
          return reject(err);
        }

        if (!user) {
          return reject(new Error('User not found'));
        }

        resolve(user);
      });
  });
};

exports.getAll = function (query, pagination) {
  return new Promise(function (resolve, reject) {
    User.paginate(query, pagination, function (err, docs) {
      if (err) {
        return reject(err);
      }

      resolve(docs);
    });
  });
};

exports.update = function (id, updates) {
  return new Promise(function (resolve, reject) {
    User
      .findById(id)
      .exec(function (err, user) {
        if (err) {
          return reject(err);
        }

        _.assign(user, updates);

        user.save(err => {
          if (err) {
            reject(err);
          } else {
            resolve(user);
          }
        });
      });
  });
};