var React = require('react');
var { Navbar, Nav } = require('react-bootstrap');
var Link = require('./link');

var nav = React.createClass({
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

          <Nav pullRight>
            <Link      to='/login' >      Login         </Link>
            <Link      to='/register' >   Register      </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
});

module.exports = nav;
