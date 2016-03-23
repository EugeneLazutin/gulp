var React = require('react');
var Nav = require('./components/nav/nav');

module.exports = React.createClass({

  render: function () {
    return (
      <div>
        <Nav />

        <div className="app-container">
          {this.props.children}
        </div>
      </div>
    );
  }
});
