var update = require('./update.service');
var apis = require('../../config/client').apis;

exports.blockUser = userId => {
  return update({
    id: userId,
    blocked: true
  }, apis.userBlock);
};

exports.unblockUser = userId => {
  return update({
    id: userId,
    blocked: false
  }, apis.userBlock);
};

exports.changeRole = (userId, role) => {
  return update({
    id: userId,
    role: role
  }, apis.userChangeRole);
};
