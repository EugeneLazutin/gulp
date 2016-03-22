var React = require('react');

module.exports = React.createClass({
  render() {
    return (
      <div className='dropdown pull-right'>
        <button className='btn btn-primary dropdown-toggle' type='button' data-toggle='dropdown'>
          Search
        </button>
        <ul className='dropdown-menu'>
          {this.props.children}
        </ul>
      </div>
    );
  }
});