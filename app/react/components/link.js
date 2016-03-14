var React = require('react');
var { PropTypes } = React;
var NavLink = require('react-router-active-component')('li');

module.exports = React.createClass({
  propTypes: {
    to: PropTypes.string
  },

  render() {
    return (
     <NavLink to={this.props.to}>
       {this.props.children}
     </NavLink>
    );
  }
});