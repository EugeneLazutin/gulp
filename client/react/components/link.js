var React = require('react');
var NavLink = require('react-router-active-component')('li');

module.exports = React.createClass({
  render() {
    return (
     <NavLink to={this.props.to}>
       {this.props.children}
     </NavLink>
    );
  }
});