var commentStore = require('../dal/comment');
var User = require('../dal/models/user');
var chalk = require('chalk');

exports.create = (bookId, userId, message) => {
  var comment = {
    message: message,
    book: bookId,
    date: new Date(),
    user: userId
  };

  return commentStore.create(comment);
};

exports.sendNewComment = comment => {

  console.log('send new comment - ', comment);

  User.populate(comment, {
    path: 'user',
    select: 'name'
  }, function (err) {

    console.log('after populating - ', err, comment);

    if (err) {
      //log error
      console.log(chalk.red(err));
    } else {

      console.log(_io);
      _io.of('/comment').emit('add_comment', comment);
    }
  });
};

exports.setRemoved = (id, removed) => {
  var updates = {
    removed: removed
  };

  return new Promise((resolve, reject) => {
    commentStore
      .update(id, updates)
      .then(() => {
        updates._id = id;
        resolve(updates);
      })
      .catch(err => {
        reject(err);
      })
  });
};