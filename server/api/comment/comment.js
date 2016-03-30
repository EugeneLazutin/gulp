var handleError = require('../utils').handleError;
var Comment = require('./comment.model');
var BookInfo = require('../book/book_info.model');
var _ = require('lodash');
var User = require('../user/user.model');

function createComment(message, bookId, userId) {
  return {
    message: message,
    bookInfo: bookId,
    date: new Date(),
    user: userId
  };
}

exports.create = function (req, res) {
  var comment = createComment(req.body.message, req.body.bookId, req.user._id);

  Comment.create(comment, function (err, createdComment) {
    if (err) {
      handleError(res, err);
    } else {

      User.populate(createdComment, {
        path: 'user',
        select: 'name'
      }, function (err) {
        if (err) {
          handleError(err);
        } else {
          _io.of('/comment').emit('add_comment', createdComment);
          res.status(201).json(createdComment);
        }
      });
    }
  });
};

exports.block = function (req, res) {
  Comment.findById(req.body.id, function (err, comment) {
    if (err) {
      return handleError(res, err);
    }

    if (!comment) {
      res.status(500).send('Comment not found.');
    }

    comment.block = req.body.blocked;
    comment.save(function (err) {
      if (err) {
        handleError(res, err);
      } else {
        res.status(200).json(comment);
      }
    });
  });
};
