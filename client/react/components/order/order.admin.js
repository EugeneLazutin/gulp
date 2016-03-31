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
    return classNames({
      'alert alert-status': true,
      'alert-info': this.props.order.status == orderStatus.booked,
      'alert-warning': this.props.order.status == orderStatus.onHand,
      'alert-success': this.props.order.status == orderStatus.closed
    });
  },

  _status() {
    switch (this.props.order.status) {
      case orderStatus.booked:
        return 'booked';
      case orderStatus.onHand:
        return 'on hand';
      case orderStatus.closed:
        return 'closed';
    }
  },

  _close() {
    orderActions.closeOrder(this.props.order._id);
  },

  _lendOut() {
    orderActions.lendOutOrder(this.props.order._id);
  },

  _buttons() {
    if (this.props.order.status == orderStatus.booked) {
      return (
        <div className="btn-group btn-group-xs">
          <button className="btn btn-info" onClick={this._lendOut}>Lend out</button>
          <button className="btn btn-danger" onClick={this._close}>Close order</button>
        </div>
      );
    } else if (status == orderStatus.onHand) {
      return <button className="btn btn-info btn-xs" onClick={this._close}>Close order</button>;
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