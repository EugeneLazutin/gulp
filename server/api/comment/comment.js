var commentService = require('../../services/comment');
var handleError = require('../utils').handleError;


exports.create = function (req, res) {
  commentService
    .create(req.body.bookId, req.user._id, req.user.getName(), req.body.message)
    .then(comment => {
      commentService.sendNewComment(comment.toObject());
      res.json(201);
    })
    .catch(err => {
      handleError(res, err);
    });
};

exports.setRemoved = function (req, res) {
  commentService
    .setRemoved(req.body.id, req.body.removed)
    .then(comment => {
      res.status(200).json(comment);
    })
    .catch(err => {
      handleError(res, err);
    });
};

exports.getAll = function (req, res) {
  commentService
    .getAll(req.body)
    .then(comments => {
      res.status(200).json(comments);
    })
    .catch(err => {
      handleError(res, err);
    });
};