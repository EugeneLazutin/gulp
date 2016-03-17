var React = require('react');
var { Navbar, Nav } = require('react-bootstrap');
var userStore = require('../../flux/stores/user.store');
var Auth = require('./auth');

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

          </Nav>

          <Auth />
        </Navbar.Collapse>
      </Navbar>
    );
  }
});
