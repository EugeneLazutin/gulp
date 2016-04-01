var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var config = require('../../../config/index');
var _ = require('lodash');
var paginate = require('mongoose-paginate');


var UserSchema = new Schema({
  email: {type: String, required: true, unique: true},
  name: {
    first: {type: String, required: true},
    last: {type: String, required: true}
  },
  passwordHash: {type: String, select: false, required: true},
  salt: {type: String, select: false, required: true},
  role: {type: Number, default: config.roles.user},
  blocked: {type: Boolean, default: false}
});

UserSchema.plugin(paginate);

UserSchema
  .virtual('password')
  .set(function (password) {

    if (_.isUndefined(password) || _.isNull(password)) {
      return this.invalidate('password', 'required', password);
    }

    if (password && password.length < config.passwordMinLength) {
      return this.invalidate(
        'password',
        `must be at least ${config.passwordMinLength} characters`,
        password
      );
    }

    this._password = password;
    this.salt = this.makeSalt();
    this.passwordHash = this.encryptPassword(password);
  })
  .get(() => {
    return this._password;
  });

UserSchema
  .path('role')
  .validate((value, respond) => {
    respond(_.includes(config.roles, value));
  }, `role is incorrect`);

UserSchema
  .path('passwordHash')
  .validate(function (value) {
    if(!value) {
      this.invalidate('password', 'required');
    }
  });

UserSchema.methods = {
  authenticate(password) {
    return this.encryptPassword(password) == this.passwordHash;
  },
  makeSalt() {
    return crypto.randomBytes(16).toString('base64');
  },
  encryptPassword(password) {
    if (!password || !this.salt) {
      throw Error('cannot encrypt password');
    }
    var salt = new Buffer(this.salt, 'base64');
    return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
  },
  isAdmin() {
    return this.role === config.roles.admin;
  },
  getName() {
    return this.name.first + ' ' + this.name.last;
  }
};

module.exports = mongoose.model('User', UserSchema);