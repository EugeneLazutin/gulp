var React = require('react');
var moment = require('moment');
var orderStatus = require('../../../../config/index').orderStatus;
var classNames = require('classnames');
var orderActions = require('../../../flux/actions/order.actions.js');


var Order = React.createClass({
  propTypes: {
    order: React.PropTypes.object
  },

  _statusClass() {
    var { status } = this.props.order;

    return classNames({
      'alert alert-status': true,
      'alert-info': status == orderStatus.booked,
      'alert-warning': status == orderStatus.onHand,
      'alert-success': status == orderStatus.rentalOver,
      'alert-danger': status == orderStatus.bookingCancelled || status == orderStatus.lost
    });
  },

  _status() {
    switch (this.props.order.status) {
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
      console.log(status)
      orderActions.closeOrder(this.props.order._id, this.props.order.book, status);
    };
  },

  _lost() {
    orderActions.lostBook(this.props.order._id, this.props.order.book);
  },

  _lendOut() {
    orderActions.lendOutOrder(this.props.order._id);
  },

  _buttons() {
    if (this.props.order.status == orderStatus.booked) {
      return (
        <div className="btn-group btn-group-xs">
          <button className="btn btn-info" onClick={this._lendOut}>Lend out</button>
          <button className="btn btn-danger" onClick={this._createCloseAction(orderStatus.bookingCancelled)}>Cancel
          </button>
        </div>
      );
    } else if (this.props.order.status == orderStatus.onHand) {
      return (
        <div className="btn-group btn-group-xs">
          <button className="btn btn-success" onClick={this._createCloseAction(orderStatus.rentalOver)}>Close</button>
          <button className="btn btn-danger" onClick={this._lost}>Lost</button>
        </div>
      );
    }
  },

  render() {
    var { order } = this.props;

    return (
      <tr>
        <td>
          {order.user.name.first + ' ' + order.user.name.last}
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