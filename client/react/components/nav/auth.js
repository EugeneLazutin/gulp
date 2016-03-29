var React = require('react');
var { browserHistory } = require('react-router');
var { Nav, NavItem } = require('react-bootstrap');
var Link = require('./../link');
var userStore = require('../../../flux/stores/user.store.js');
var userActions = require('../../../flux/actions/user.actions.js');


module.exports = React.createClass({
  componentDidMount() {
    userActions.tryFetchUser();
  },

  logout(){
    userActions.logout();
    browserHistory.push('/login');
  },

  render() {
    return userStore.isAuthorized() ?

      (<Nav pullRight>
        <Link to='/user'> {userStore.fullName()} </Link>
        <NavItem onClick={this.logout}>Logout</NavItem>
      </Nav>)

      :

      (<Nav pullRight>
        <Link to='/login'> Login </Link>
        <Link to='/register'> Register </Link>
      </Nav>);

  }
});