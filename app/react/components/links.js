var React = require('react');
var Link = require('./link');

module.exports = React.createClass({
  render() {
    return (
      <ul className='nav navbar-nav'>
        <Link      to='/'         >/            </Link>
        <Link      to='/page2'    >/page 2      </Link>
        <Link      to='/page2/3'  >/page 2 / 3  </Link>
        <Link      to='/page3'    >/page 3      </Link>
      </ul>
    );
  }
});