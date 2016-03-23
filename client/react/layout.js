var React = require('react');
var Nav = require('./components/nav/nav');
var Asd = require('./components/filter/search_nav');

module.exports = React.createClass({

  render: function () {
    return (
      <div>
        <Nav />

        <Asd />

        <div className="app-container">
          {this.props.children}
        </div>
      </div>
    );
  }
});
