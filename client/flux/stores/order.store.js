var alt = require('../alt');
var orderActions = require('../actions/order.actions');


class OrderStore {
  constructor() {
    this.bindActions(orderActions);

    this.order = null;
  }

  onReceiveOrder(order) {
    this.order = order;
  }

  onLendOutOrder() {
    this.order = null;
    return false;
  }

  onCloseOrder() {
    this.order = null;
    return false;
  }
}

module.exports = alt.createStore(OrderStore);