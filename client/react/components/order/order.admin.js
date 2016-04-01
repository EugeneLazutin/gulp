var React = require('react');
var moment = require('moment');
var orderStatus = require('../../../../config/index').orderStatus;
var classNames = require('classnames');
var orderService = require('../../../services/order.service');


var Order = React.createClass({
  propTypes: {
    order: React.PropTypes.object
  },

  getInitialState() {
    return this.props.order;
  },

  _statusClass() {
    var status = this.state.status;

    return classNames({
      'alert alert-status': true,
      'alert-info': status == orderStatus.booked,
      'alert-warning': status == orderStatus.onHand,
      'alert-success': status == orderStatus.rentalOver,
      'alert-danger': status == orderStatus.bookingCancelled || status == orderStatus.lost
    });
  },

  _status() {
    switch (this.state.status) {
      case orderStatus.booked:
        return 'booked';
      case orderStatus.onHand:
        return 'on hand';
      case orderStatus.rentalOver:
        return 'closed';
      case orderStatus.bookingCancelled:
        return 'cancelled';
      case orderStatus.lost:
        return 'lost'
    }
  },

  _createCloseAction(status) {
    return () => {
      orderService
        .closeOrder(this.state._id, this.state.book, status)
        .then(this._updateOrder)
        .catch(this._handleError);
    };
  },

  _lost() {
    orderService
      .lostOrder(this.state._id, this.state.book)
      .then(this._updateOrder)
      .catch(this._handleError);
  },

  _lendOut() {
    orderService
      .lendOutOrder(this.state._id)
      .then(this._updateOrder)
      .catch(this._handleError);
  },

  _updateOrder(updates) {
    this.setState(updates);
  },

  _handleError(err) {
    console.log(err);
  },

  _buttons() {
    if (this.state.status == orderStatus.booked) {
      return (
        <div className="btn-group btn-group-xs">
          <button className="btn btn-info" onClick={this._lendOut}>Lend out</button>
          <button className="btn btn-danger" onClick={this._createCloseAction(orderStatus.bookingCancelled)}>Cancel
          </button>
        </div>
      );
    } else if (this.state.status == orderStatus.onHand) {
      return (
        <div className="btn-group btn-group-xs">
          <button className="btn btn-success" onClick={this._createCloseAction(orderStatus.rentalOver)}>Close</button>
          <button className="btn btn-danger" onClick={this._lost}>Lost</button>
        </div>
      );
    }
  },

  render() {
    var order = this.state;

    return (
      <tr>
        <td>
          {order.userName}
        </td>
        <td>
          {moment(order.date.start).format('LL')}
        </td>
        <td>
          {moment(order.date.end).calendar()}
        </td>
        <th>
          <div className={this._statusClass()}>
            {this._status()}
          </div>
        </th>
        <td>
          {this._buttons()}
        </td>
      </tr>
    );
  }
});

module.exports = Order;