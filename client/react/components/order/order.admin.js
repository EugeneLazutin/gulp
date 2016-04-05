var React = require('react');
var moment = require('moment');
var orderStatus = require('../../../../config/index').orderStatus;
var classNames = require('classnames');
var orderService = require('../../../services/order.service');


var Order = React.createClass({
  propTypes: {
    order: React.PropTypes.object,
    showButtons: React.PropTypes.bool
  },

  getInitialState() {
    return this.props.order;
  },

  _statusClass() {
    var status = this.state.status;

    return classNames({
      'alert alert-status': true,
      'alert-info': status == orderStatus.booked,
      'alert-warning': status == orderStatus.onHand || status == orderStatus.notified,
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
        return 'lost';
      case orderStatus.notified:
        return 'notified';
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
      .lostOrder(this.state._id)
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
    var status = this.state.status;

    if(this.props.showButtons) {
      if (status == orderStatus.booked) {
        return (
          <div className="btn-group btn-group-xs">
            <button className="btn btn-info" onClick={this._lendOut}>Lend out</button>
            <button className="btn btn-danger" onClick={this._createCloseAction(orderStatus.bookingCancelled)}>Cancel
            </button>
          </div>
        );
      } else if (status == orderStatus.onHand || status == orderStatus.notified) {
        return (
          <div className="btn-group btn-group-xs">
            <button className="btn btn-success" onClick={this._createCloseAction(orderStatus.rentalOver)}>Close</button>
            <button className="btn btn-danger" onClick={this._lost}>Lost</button>
          </div>
        );
      }
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
          {order.bookTitle}
        </td>
        <td>
          {moment(order.date.start).format('LL')}
        </td>
        <td>
          {moment(order.date.end).calendar()}
        </td>
        <td>
          <div className={this._statusClass()}>
            {this._status()}
          </div>
        </td>
        <td>
          {this._buttons()}
        </td>
      </tr>
    );
  }
});

module.exports = Order;