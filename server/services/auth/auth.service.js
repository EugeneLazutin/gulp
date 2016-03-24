var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var compose = require('composable-middleware');
var User = require('../../api/user/user.model');
var config = require('../../../config');
var tokenExpiresIn = config.tokenExpiresIn;
var secret = config.secret;
var validateJwt = expressJwt({ secret: secret });


module.exports = {
  isAuthenticated,
  signToken
};

function isAuthenticated(isAdmin) {
  return compose()
    .use(validateJwt)
    .use((req, res, next) => {
      User.findById(req.user._id, (err, user) => {
        if(err) {
          return next(err);
        }
        if(!user) {
          return res.sendStatus(401);
        }
        if(isAdmin && !user.isAdmin()) {
          return res.sendStatus(403);
        }
        req.user = user;
        next();
      })
    });
}

function signToken(id) {
  return jwt.sign(
    { _id: id },
    secret,
    { expiresIn: tokenExpiresIn }
  );
}