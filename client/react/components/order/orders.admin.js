var React = require('react');
var _ = require('lodash');
var Order = require('./order.admin.js');
var userStore = require('../../../flux/stores/user.store');


var OrdersAdmin = React.createClass({
  render() {
    var orders = this.props.children;

    if (!orders || !orders.length) {
      return <i>There are no active orders.</i>;
    }

    return (
      <table className="table">
        <thead>
        <tr>
          <th>
            User
          </th>
          <th>
            Book
          </th>
          <th>
            Start date
          </th>
          <th>
            End date
          </th>
          <th>
            Status
          </th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        {orders.map((order, i) => {
          return (
            <Order order={order} showButtons={userStore.isAdmin()} key={i}/>
          );
        })}
        </tbody>
      </table>
    );
  }
});

module.exports = OrdersAdmin;