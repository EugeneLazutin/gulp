var React = require('react');
var { Navbar, Nav } = require('react-bootstrap');
var userStore = require('../../../flux/stores/user.store.js');
var Auth = require('./auth');
var Link = require('./../link');



module.exports = React.createClass({

  getInitialState() {
    return userStore.getState();
  },

  componentWillMount() {
    userStore.listen(this.onChange);
  },

  componentWillUnmount() {
    userStore.unlisten(this.onChange);
  },

  onChange(state) {
    this.setState(state);
  },

  render() {
    return (
      <Navbar staticTop fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">React-Bootstrap</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>

        <Navbar.Collapse>

          <Nav>
            <Link to='/books'> Books </Link>
          </Nav>

          <Auth />
        </Navbar.Collapse>
      </Navbar>
    );
  }
});
