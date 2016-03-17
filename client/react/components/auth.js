var React = require('react');
var { browserHistory } = require('react-router');
var { Nav, NavItem } = require('react-bootstrap');
var Link = require('./link');
var userStore = require('../../flux/stores/user.store');
var userActions = require('../../flux/actions/user.actions');


module.exports = React.createClass({

  logout(){
    userActions.remove();
    browserHistory.push('/login');
  },

  render() {
    if (userStore.isAuthorized()) {
      return (
        <Nav pullRight>
          <Link to='/user'> {userStore.fullName()} </Link>
          <NavItem onClick={this.logout}>Logout</NavItem>
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