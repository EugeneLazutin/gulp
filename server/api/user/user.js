var _ = require('lodash');
var auth = require('../../services/auth/auth.service.js');
var User = require('./user.model.js');

function handleError (res, err) {
  return res.status(500).send(err);
}

exports.create = function (req, res) {
  User.create(req.body, (err, user) => {
    if(err) {
      return handleError(res, err);
    }
    res.status(201).json({
      user: _.omit(user.toObject(), ['passwordHash', 'salt']),
      token: auth.signToken(user._id)
    });
  });
};

exports.getMe = function (req, res) {
  User.findById(req.user._id, (err, user) => {
    if(err) {
      handleError(res, err);
    }
    if(!user) {
      return res.json(401);
    }
    res.status(200).json(user);
  });
};