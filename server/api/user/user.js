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
    .getWithOrders(req.params.id)
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

exports.changeRole = function (req, res) {
  var userId = req.body.id;

  if(req.user._id == userId) {
    return handleError(res, new Error('You cannot change the role itself.'));
  }

  userService
    .changeRole(userId, req.body.role)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      handleError(res, err);
    });
};