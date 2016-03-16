var React = require('react');
var Nav = require('./components/nav');

var App = React.createClass({
  render: function () {
    return (
      <div>
        <Nav />
        {this.props.children}
      </div>
    );
  }
});

module.exports = App;