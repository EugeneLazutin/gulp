var alt = require('../alt');
var agent = require('superagent');
var cookie = require('react-cookie');
var error = require('../error_handler');
var { hashHistory } = require('react-router');

class OrderActions {
  lendOutOrder(orderId) {
    return dispatch => {
      dispatch();

      this._updateOrder(orderId, '/api/order/lend-out');
    };
  }

  closeOrder(orderId) {
    return dispatch => {
      dispatch();

      this._updateOrder(orderId, '/api/order/close');
    };
  }

  receiveOrder(order) {
    return order;
  }

  _updateOrder(orderId, url) {
    agent
      .post(url)
      .set('Authorization', 'Bearer ' + cookie.load('token'))
      .send({id: orderId})
      .end((err, res) => {
        if (err) {
          error(err)
        }

        this.receiveOrder(res.body);
      });
  }
}

module.exports = alt.createActions(OrderActions);