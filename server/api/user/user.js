var _ = require('lodash');
var auth = require('../../services/auth/auth.service.js');
var User = require('./user.model.js');
var Order = require('../order/order.model');
var Book = require('../book/book_info.model');
var handleError = require('../utils').handleError;

exports.create = function (req, res) {
  User.create(req.body, function (err, user) {
    if (err) {
      return handleError(res, err);
    }
    res.status(201).json({
      user: _.omit(user.toObject(), ['passwordHash', 'salt']),
      token: auth.signToken(user._id)
    });
  });
};

exports.getMe = function (req, res) {
  if (!user) {
    return res.json(401);
  }

  res.status(200).json(req.user);

};

exports.fullInfo = function (req, res) {
  User
    .findById(req.user._id)
    .exec(function (err, user) {
        if (err) {
          return handleError(res, err);
        }
        if (!user) {
          return res.json(401);
        }

        Order.find({user: user._id})
          .exec(function (err, orders) {
            if (err) {
              return handleError(res, err);
            }


            Book.populate(orders, {
              path: 'bookInfo',
              select: ['title', 'picture', 'author']
            }, function (err) {
              if (err) {
                return handleError(res, err);
              }

              var result = user.toObject();
              result.orders = orders;

              res.status(200).json(result);
            })
          });
      }
    );
};