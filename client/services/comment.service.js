var update = require('./update.service');
var apis = require('../../config/client').apis;

exports.removeComment = commentId => {
  return update({
    id: commentId,
    removed: true
  }, apis.commentRemove);
};

exports.restoreComment = commentId => {
  return update({
    id: commentId,
    removed: false
  }, apis.commentRemove);
};