var User = require('./models/user');


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