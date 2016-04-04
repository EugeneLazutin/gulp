var _ = require('lodash');
var express = require('express');
var router = express.Router();
var passport = require('passport');

var auth = require('../services/auth/auth.service');
require('../services/auth/passport.config');

/* POST login. */
router.post('/auth', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    var error = err || info;
    if(error) {
      return res.status(401).json(error);
    }
    if(!user) {
      return res.status(401).json({ msg: 'login failed' });
    }
    if(user.blocked) {
      return res.status(401).json({ msg: 'you are blocked by admin'});
    }
    res.json({
      user: _.omit(user.toObject(), ['passwordHash', 'salt']),
      token: auth.signToken(user._id)
    });
  })(req, res, next);
});

/* GET home page. */
router.get('*', function(req, res) {
  res.render('index');
});

module.exports = router;
