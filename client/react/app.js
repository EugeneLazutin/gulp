var React = require('react');
var Nav = require('./components/nav');

module.exports = React.createClass({

  render: function () {
    return (
      <div>
        <Nav />
        {this.props.children}
      </div>
    );
  }
});
