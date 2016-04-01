var update = require('./update.service');

exports.lendOutOrder = orderId => {
  return update({orderId}, '/api/order/lend-out');
};

exports.closeOrder = (orderId, bookId, status) => {
  return update({orderId, bookId, status}, '/api/order/close');
};

exports.lostOrder = (orderId, bookId) => {
  return update({orderId, bookId}, '/api/order/lost');
};