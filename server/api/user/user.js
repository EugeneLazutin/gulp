var _ = require('lodash');
var auth = require('../../services/auth/auth.service');
var handleError = require('../utils').handleError;
var userService = require('../../services/user');

exports.create = (req, res) => {
  userService
    .create(req.body)
    .then(user => {
      res.status(201).json({
        user: _.omit(user.toObject(), ['passwordHash', 'salt']),
        token: auth.signToken(user._id)
      });
    })
    .catch(err => {
      handleError(res, err);
    });
};

exports.getMe = (req, res) => {
  if (!req.user) {
    res.json(401);
  } else {
    res.status(200).json(req.user);
  }
};

exports.fullInfo = (req, res) => {
  userService
    .getWithOrders(req.user._id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      handleError(res, err);
    });
};

exports.getAll = function (req, res) {
  userService
    .getAll(req.body)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      handleError(res, err);
    });
};

exports.setBlocked = function (req, res) {
  userService
    .setBlocked(req.body.id, req.body.blocked)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      handleError(res, err);
    });
};