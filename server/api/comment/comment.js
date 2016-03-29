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

  BookInfo.findById(req.body.bookId, function (err, bookInfo) {
    if (err) {
      return handleError(res, err);
    }

    if (!bookInfo) {
      return res.status(500).send('Book not found.');
    }

    Comment.create(comment, function (err, createdComment) {
      if (err) {
        handleError(res, err);
      } else {

        bookInfo.comments.push(createdComment);
        bookInfo.save(function (err) {
          if (err) {
            return handleError(res, err);
          }


          User.populate(createdComment, {
            path: 'user',
            select: 'name'
          }, function (err) {
            if(err) {
              handleError(err);
            } else {
              _io.of('/comment').emit('add_comment', createdComment);
              res.status(201).json(createdComment);
            }
          });
        })
      }
    });
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

exports.getComments = function (req, res) {
  var bookId = req.params.bookId;

  if (bookId) {
    Comment.find({bookInfo: bookId}, function (err, comments) {
      if (err) {
        handleError(res, err);
      } else {
        res.status(200).json(comments);
      }
    });
  } else {
    res.status(500).send('bookId required');
  }
};
