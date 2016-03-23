var React = require('react');

module.exports = placeholder => {
  return React.createClass({
    propTypes: {
      hideFilter: React.PropTypes.func
    },

    render() {
      return (
        <div className="filter">
          <div className='input-group'>
            <input type='text' className='form-control input-sm' placeholder={placeholder}/>
        <span className='input-group-btn'>
          <button className='btn btn-sm btn-danger' type='button' onClick={this.props.hideFilter}>
            <span className='glyphicon glyphicon-remove'></span>
          </button>
        </span>
          </div>
        </div>
      );
    }
  });
};
