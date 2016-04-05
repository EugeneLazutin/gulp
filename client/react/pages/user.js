var React = require('react');
var fullUserActions = require('../../flux/actions/fullUser.actions');
var fullUserStore = require('../../flux/stores/fullUser.store');
var Orders = require('../components/order/orders.admin');


var UserPage = React.createClass({
  getInitialState() {
    return fullUserStore.getState();
  },

  componentDidMount(){
    fullUserStore.listen(this.onChange);
    fullUserActions.fetchFullUser(this.props.params.id);
  },

  componentWillUnmount() {
    fullUserStore.unlisten(this.onChange);
  },

  onChange(state) {
    this.setState(state);
  },

  render() {
    var user = this.state.user;

    if(!user) {
      return <div className="loader" />;
    }

    return (
      <div className="container">
        <h3>{user.name.first + ' ' + user.name.last}</h3>
        <h4>{user.email}</h4>

        <Orders>{user.orders}</Orders>
      </div>
    );
  }
});

module.exports = UserPage;