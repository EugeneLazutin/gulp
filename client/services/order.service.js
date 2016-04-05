var update = require('./update.service');
var apis = require('../../config/client').apis;

exports.lendOutOrder = orderId => {
  return update({orderId}, apis.orderLendOut);
};

exports.closeOrder = (orderId, bookId, status) => {
  return update({orderId, bookId, status}, apis.orderClose);
};

exports.lostOrder = (orderId) => {
  return update({orderId}, apis.orderLost);
};