var User = require('./models/user');
var factory = require('./helpers/dal.factory.js');


exports.create = factory.create(User);

exports.getAll = factory.getAll(User);

exports.update = factory.update(User);

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