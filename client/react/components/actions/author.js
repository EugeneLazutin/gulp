var React = require('react');

var Author = React.createClass({
  propTypes: {
    key: React.PropTypes.number
  },

  render() {
    return (
      <div className='input-group search' key={this.props.key}>
        <span className='input-group-btn'>
          <button className='btn btn-default border-fix' type='button'><span className='glyphicon glyphicon-search'></span></button>
        </span>
        <input type='text' className='form-control' placeholder='author'/>
        <span className='input-group-btn'>
          <button className='btn btn-danger' type='button'><span className='glyphicon glyphicon-remove'></span></button>
        </span>
      </div>
    );
  }
});

module.exports = {
  name: 'author',
  isActive: false,
  Component: Author
};