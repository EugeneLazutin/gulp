var React = require('react');
var Nav = require('./components/nav');

module.exports = React.createClass({

  render: function () {
    return (
      <div>
        <Nav />
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
});
