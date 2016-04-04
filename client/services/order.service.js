var update = require('./update.service');

exports.lendOutOrder = orderId => {
  return update({orderId}, '/api/order/lend-out');
};

exports.closeOrder = (orderId, status) => {
  return update({orderId, status}, '/api/order/close');
};

exports.lostOrder = (orderId) => {
  return update({orderId}, '/api/order/lost');
};