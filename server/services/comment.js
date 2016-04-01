var commentStore = require('../dal/comment');
var User = require('../dal/models/user');
var chalk = require('chalk');
var toQuery = require('./search').toQuery;


exports.create = (bookId, userId, userName, message) => {
  var comment = {
    message: message,
    book: bookId,
    date: new Date(),
    user: userId,
    userName: userName
  };

  return commentStore.create(comment);
};

exports.sendNewComment = comment => {
  _io.of('/comment').emit('add_comment', comment);
};

exports.setRemoved = (id, removed) => {
  var updates = {
    removed: removed
  };

  return new Promise((resolve, reject) => {
    commentStore
      .update(id, updates)
      .then(() => {
        resolve(updates);
      })
      .catch(err => {
        reject(err);
      })
  });
};

exports.getAll = params => {
  var query = toQuery(params.search);

  return commentStore.getAll(query, params.pagination);
};