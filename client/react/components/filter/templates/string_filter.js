var React = require('react');

module.exports = placeholder => {
  return React.createClass({
    propTypes: {
      hideFilter: React.PropTypes.func
    },

    render() {
      return (
        <div className='input-group search'>
          <input type='text' className='form-control' placeholder={placeholder}/>
        <span className='input-group-btn'>
          <button className='btn btn-danger' type='button' onClick={this.props.hideFilter}>
            <span className='glyphicon glyphicon-remove'></span>
          </button>
        </span>
        </div>
      );
    }
  });
};
