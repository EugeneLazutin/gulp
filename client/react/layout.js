var React = require('react');
var Nav = require('./components/nav/nav');


var Layout = React.createClass({
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

module.exports = Layout;