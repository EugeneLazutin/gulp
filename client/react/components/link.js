var React = require('react');
var NavLink = require('react-router-active-component')('li');


var Link = React.createClass({
  render() {
    return (
     <NavLink to={this.props.to}>
       {this.props.children}
     </NavLink>
    );
  }
});

module.exports = Link;