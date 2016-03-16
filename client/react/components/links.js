var React = require('react');
var Link = require('./link');

module.exports = React.createClass({
  render() {
    return (
      <ul className='nav navbar-nav'>
        <Link      to='/login' >      Login         </Link>
        <Link      to='/register' >   Register      </Link>
      </ul>
    );
  }
});