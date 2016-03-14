var mongoose = require('mongoose');
var Schema  = mongoose.Schema;
var crypto = require('crypto');

var UserSchema = new Schema ({
  email: String,
  name: {
    first: String,
    last: String
  },
  passwordHash: { type: String, select: false },
  salt: { type: String, select: false },
  status: Number
});


UserSchema
  .virtual('password')
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.passwordHash = this.encryptPassword(password);
  })
  .get(() => {
    return this._password;
  });

UserSchema
  .path('email')
  .validate(function (value, respond) {
    var self = this;
    this.constructor.findOne({ email: value }, (err, user) => {
      if(err) {
        throw err;
      }
      if(user) {
        if(self.id === user.id) {
          return respond(true);
        }
        return respond(false);
      }
      respond(true);
    });
  }, 'email already used');

UserSchema.methods = {
  authenticate(password) {
    return this.encryptPassword(password) == this.passwordHash;
  },
  makeSalt() {
    return crypto.randomBytes(16).toString('base64');
  },
  encryptPassword(password) {
    if(!password || !this.salt) {
      return '';
    }
    var salt = new Buffer(this.salt, 'base64');
    return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
  }
}

module.exports = mongoose.model('User', UserSchema);