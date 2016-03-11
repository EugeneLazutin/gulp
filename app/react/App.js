var React = require('react');
var { Link } = require('react-router');

const ACTIVE = { color: 'red' }

var App = React.createClass({
  render: function () {
    return (
      <div>
        <h1>Pages</h1>
        <ul>
          <li><Link      to="/"           activeStyle={ACTIVE}>/</Link></li>
          <li><Link      to="/page1"      activeStyle={ACTIVE}>/page 1</Link></li>
          <li><Link      to="/page2"      activeStyle={ACTIVE}>/page 2</Link></li>
          <li><Link      to="/page3"      activeStyle={ACTIVE}>/page 3</Link></li>
        </ul>
        {this.props.children}
      </div>
    );
  }
});

module.exports = App;