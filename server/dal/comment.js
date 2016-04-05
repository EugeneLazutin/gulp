var Comment = require('./models/comment');
var factory = require('./helpers/dal.factory.js');


exports.create = factory.create(Comment);

exports.getAll = factory.getAll(Comment);

exports.update = factory.update(Comment);

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