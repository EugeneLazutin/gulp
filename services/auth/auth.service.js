var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var compose = require('composable-middleware');

var User = require('../../api/user/user.model');

var secret = 'my_secret';
var validateJwt = expressJwt({ secret: secret });

exports.isAuthenticated = () => {
  return compose()
    .use(validateJwt)
    .use((req, res, next) => {
      console.log(req.user);
      User.findById(req.user._id, (err, user) => {
        if(err) {
          return next(err);
        }
        if(!user) {
          console.log("-=-=-=-=Ooops!=-=-=-=-");
          return res.sendStatus(401);
        }
        req.user = user;
        next();
      })
    });
};

exports.signToken = (id) => {
  return jwt.sign(
    { _id: id },
    secret,
    { expiresIn: 60 * 60 * 5 }
  );
};