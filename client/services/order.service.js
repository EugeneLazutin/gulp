var update = require('./update.service');
var apis = require('../../config/client').apis;

exports.lendOutOrder = orderId => {
  return update({orderId}, apis.orderLendOut);
};

exports.closeOrder = (orderId, status) => {
  return update({orderId, status}, apis.orderClose);
};

exports.lostOrder = (orderId) => {
  return update({orderId}, apis.orderLost);
};