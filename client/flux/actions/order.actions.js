var alt = require('../alt');
var agent = require('superagent');
var cookie = require('react-cookie');
var error = require('../error_handler');
var orderStatus = require('../../../config').orderStatus;
var { hashHistory } = require('react-router');

class OrderActions {
  lendOutOrder(orderId) {
    return dispatch => {
      dispatch();

      this._updateOrder({id: orderId}, '/api/order/lend-out');
    };
  }

  closeOrder(orderId, bookId, status) {
    return dispatch => {
      dispatch();


      console.log(status);
      this._updateOrder({orderId, bookId, status}, '/api/order/close');
    };
  }

  lostBook(orderId, bookId) {
    return dispatch => {
      dispatch();

      this._updateOrder({orderId, bookId}, '/api/order/lost');
    };
  }

  receiveOrder(order) {
    return order;
  }

  _updateOrder(params, url, status) {
    agent
      .post(url)
      .set('Authorization', 'Bearer ' + cookie.load('token'))
      .send(params)
      .end((err, res) => {
        if (err) {
          error(err)
        }

        this.receiveOrder(res.body);
      });
  }
}

module.exports = alt.createActions(OrderActions);