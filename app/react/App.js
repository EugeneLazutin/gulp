var React = require('react');
var Nav = require('./components/nav');
var Links = require('./components/links');

var App = React.createClass({
  render: function () {
    return (
      <div>
        <Nav>
          <Links/>
        </Nav>

        {this.props.children}
      </div>
    );
  }
});

module.exports = App;