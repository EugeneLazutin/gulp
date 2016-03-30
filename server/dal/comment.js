var Comment = require('./models/comment');


exports.create = function (comment) {
  return new Promise(function (resolve, reject) {
    Comment.create(comment, function (err, createdComment) {
      if (err) {
        return reject(err);
      }
      resolve(createdComment);
    });
  });
};

exports.update = function (id, updates) {
  return new Promise(function (resolve, reject) {
    Comment
      .findOneAndUpdate(id, updates)
      .exec(function (err, comment) {
        if (err) {
          return reject(err);
        }

        resolve(comment);
      });
  });
};

exports.find = query => {
  return new Promise((resolve, reject) => {
    Comment
      .find(query)
      .exec((err, comments) => {
        if (err) {
          return reject(err);
        }

        resolve(comments);
      });
  });
};
