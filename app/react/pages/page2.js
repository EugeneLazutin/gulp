var React = require('react');

var Page = React.createClass({
  render: function () {
    return (
      <div>
        Page 2
        {this.props.children}
      </div>
    );
  }
});

module.exports = Page;