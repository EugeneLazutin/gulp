var update = require('./update.service');

exports.blockUser = userId => {
  return update({
    id: userId,
    blocked: true
  }, '/api/user/set-blocked');
};

exports.unblockUser = userId => {
  return update({
    id: userId,
    blocked: false
  }, '/api/user/set-blocked');
};