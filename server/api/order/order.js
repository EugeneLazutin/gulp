var handleError = require('../utils').handleError;
var orderService = require('../../services/order');


exports.makeOrder = function (req, res) {
  orderService
    .create(req.body.id, req.user._id)
    .then(order => {
      res.status(200).json(order);
    })
    .catch(err => {
      handleError(res, err);
    });
};

exports.takeOrder = function (req, res) {
  orderService
    .giveOnHand(req.body.id)
    .then(order => {
      res.status(200).json(order);
    })
    .catch(err => {
      handleError(res, err);
    });
};

exports.closeOrder = function (req, res) {
  orderService
    .closeOrder(req.body.orderId, req.body.bookId, req.body.status)
    .then(order => {
      res.status(200).json(order);
    })
    .catch(err => {
      handleError(res, err);
    });
};

exports.lostOrder = function (req, res) {
  orderService
    .lostOrder(req.body.orderId, req.body.bookId)
    .then(order => {
      res.status(200).json(order);
    })
    .catch(err => {
      handleError(res, err);
    });
};