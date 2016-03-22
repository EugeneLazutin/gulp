var React = require('react');

var Title = React.createClass({
  getInitialState() {
    return {
      name: 'title',
      isActive: false
    }
  },

  propTypes: {
    key: React.PropTypes.number
  },

  render() {
    return (
      <div className='input-group search' key={this.props.key}>
        <span className='input-group-btn'>
          <button className='btn btn-default border-fix' type='button'>
            <span className='glyphicon glyphicon-search'></span>
          </button>
        </span>
        <input type='text' className='form-control' placeholder='title'/>
        <span className='input-group-btn'>
          <button className='btn btn-danger' type='button'>
            <span className='glyphicon glyphicon-remove'></span>
          </button>
        </span>
      </div>
    );
  }
});

var filter = {
  name: 'title',
  isActive: false,
  Component: Title
};

module.exports = filter;