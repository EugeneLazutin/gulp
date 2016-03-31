var React = require('react');
var orderStore = require('../../../flux/stores/order.store.js');
var _ = require('lodash');
var Order = require('./order.admin.js');


module.exports = React.createClass({
  propTypes: {
    orders: React.PropTypes.array
  },

  getInitialState() {
    return {
      orders: this.props.orders
    }
  },

  componentDidMount() {
    orderStore.listen(this.updateOrder);
  },

  componentWillUnmount() {
    orderStore.unlisten(this.updateOrder);
  },

  updateOrder(state) {
    var index = _.findIndex(this.state.orders, order => {
      return order._id === state.order._id;
    });

    if (index != -1) {
      _.assign(this.state.orders[index], state.order);
      this.setState(this.state);
    }
  },

  render() {
    var { orders } = this.props;

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
            <Order order={order} key={i}/>
          );
        })}
        </tbody>
      </table>
    );
  }
});