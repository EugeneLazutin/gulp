var React = require('react');
var types = require('./number_filter.types.json');
var classNames = require('classnames');

module.exports = placeholder => {
  return React.createClass({
    propTypes: {
      hideFilter: React.PropTypes.func
    },

    getInitialState() {
      return {
        type: types.equal
      };
    },

    getClass() {
      var type = this.state.type;

      return classNames({
        'glyphicon': true,
        'glyphicon-asterisk': type === types.equal,
        'glyphicon-chevron-right': type === types.more,
        'glyphicon-chevron-left': type === types.less
      });
    },

    createSetType(type) {
      return evt => {
        this.setState({
          type: type
        });
      };
    },

    render() {
      return (
        <div className="filter">
          <div className='input-group'>
        <span className='input-group-btn'>
          <button type='button' className='btn btn-sm btn-default dropdown-toggle border-fix' data-toggle='dropdown'
                  aria-haspopup='true'
                  aria-expanded='false'><span className={this.getClass()}></span>
          </button>
          <ul className='dropdown-menu'>
            <li>
              <a className='empty-link' onClick={this.createSetType(types.equal)}>
                <span className='glyphicon glyphicon-asterisk'></span> Equal
              </a>
            </li>
            <li>
              <a className='empty-link' onClick={this.createSetType(types.more)}>
                <span className='glyphicon glyphicon-chevron-right'></span> More than
              </a>
            </li>
            <li>
              <a className='empty-link' onClick={this.createSetType(types.less)}>
                <span className='glyphicon glyphicon-chevron-left'></span> Less than
              </a>
            </li>
          </ul>
        </span>
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


