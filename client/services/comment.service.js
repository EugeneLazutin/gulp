var update = require('./update.service');

exports.removeComment = commentId => {
  return update({
    id: commentId,
    removed: true
  }, '/api/comment/set-removed');
};

exports.restoreComment = commentId => {
  return update({
    id: commentId,
    removed: false
  }, '/api/comment/set-removed');
};