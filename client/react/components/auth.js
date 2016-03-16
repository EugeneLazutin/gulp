var React = require('react');
var { Nav, NavItem } = require('react-bootstrap');
var Link = require('./link');
var userStore = require('../../flux/stores/user.store');
var userActions = require('../../flux/actions/user.actions');


module.exports = React.createClass({
  render() {
    if (userStore.isAuthorized()) {
      return (
        <Nav pullRight>
          <Link to='/user'> {userStore.fullName()} </Link>
          <NavItem onClick={userActions.remove}>Logout</NavItem>
        </Nav>
      );
    } else {
      return (
        <Nav pullRight>
          <Link to='/login'> Login </Link>
          <Link to='/register'> Register </Link>
        </Nav>
      );
    }
  }
});