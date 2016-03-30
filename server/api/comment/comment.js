var commentService = require('../../services/comment');
var handleError = require('../utils').handleError;


exports.create = function (req, res) {
  commentService
    .create(req.body.bookId, req.user._id, req.body.message)
    .then(comment => {
      commentService.sendNewComment(comment.toObject());
      res.json(201);
    })
    .catch(err => {
      handleError(res, err);
    });
};

exports.block = function (req, res) {
  commentService
    .block(req.body.id)
    .then(comment => {
      res.status(200).json(comment);
    })
    .catch(err => {
      handleError(res, err);
    });
};
