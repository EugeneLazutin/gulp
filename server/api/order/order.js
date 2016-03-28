var handleError = require('../utils').handleError;
var BookInfo = require('../book/book_info.model');
var Order = require('./order.model');
var orderStatus = require('../../../config').orderStatus;
var orderAmount = require('../../../config').orderAmount;
var _ = require('lodash');

exports.makeOrder = function (req, res) {
  BookInfo.findById(req.body.id, function (err, bookInfo) {
    if (err) {
      return handleError(res, err);
    }

    if(!bookInfo) {
      return res.status(500).send('Book not found.');
    }

    if (bookInfo.available < 1) {
      return res.status(500).send('No available books found.');
    }

    var order = createOrder(req.body.id, req.user._id);

    Order.create(order, function (err, createdOrder) {
      if (err) {
        return handleError(res, err);
      }

      bookInfo.available -= 1;

      bookInfo.save(function (err) {
        if(err) {
          return handleError(res, err);
        }
        res.status(200).json(createdOrder);
      });
    });
  });
};

function createOrder(bookId, userId) {
  var startDate = new Date();
  var endDate = new Date();
  endDate.setDate(startDate.getDate() + orderAmount[orderStatus.booked]);

  return {
    status: orderStatus.booked,
    bookInfo: bookId,
    date: {
      start: startDate,
      end: endDate
    },
    user: userId
  };
}

exports.takeOrder = function (req, res) {
  Order.findById(req.body.id, function(err, order) {
    if(err) {
      return handleError(res, err);
    }

    if(!order) {
      return res.status(500).send('Order not found.');
    }

    order.status = orderStatus.onHand;
    order.date.start = new Date();
    order.date.end = new Date();
    order.date.end.setDate(order.date.start.getDate() + orderAmount[orderStatus.onHand]);
    order.save(function (err) {
      if(err) {
        return handleError(res, err);
      }
      res.status(200).send('success');
    });
  });
};



