var handleError = require('../utils').handleError;
var orderService = require('../../services/order');


exports.makeOrder = function (req, res) {
  orderService
    .create(req.body.id, req.user._id, req.user.getName(), req.body.title)
    .then(order => {
      res.status(200).json(order);
    })
    .catch(err => {
      handleError(res, err);
    });
};

exports.takeOrder = function (req, res) {
  orderService
    .giveOnHand(req.body.orderId)
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

exports.getAll = function (req, res) {
  orderService
    .getAll(req.body)
    .then(orders => {
      res.status(200).json(orders);
    })
    .catch(err => {
      console.log(err);
      handleError(res, err);
    });
};