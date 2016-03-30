var React = require('react');
var moment = require('moment');

module.exports = React.createClass({
  propTypes: {
    orders: React.PropTypes.array
  },

  render() {
    var { orders } = this.props;

    if (!orders || !orders.length) {
      return <div>There are no active orders.</div>;
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
        </tr>
        </thead>
        <tbody>
        {orders.map((order, i) => {
          return (
            <tr key={i}>
              <td>
                {order.user.name.first + ' ' + order.user.name.last}
              </td>
              <td>
                {moment(order.date.start).format('LL')}
              </td>
              <td>
                {moment(order.date.end).calendar()}
              </td>
            </tr>
          );
        })}
        </tbody>
      </table>
    );
  }
});