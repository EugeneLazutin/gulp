var React = require('react');
var mixin = require('./template_mixin');

module.exports = placeholder => {
  return React.createClass({
    propTypes: {
      hideFilter: React.PropTypes.func,
      changeHandler: React.PropTypes.func
    },

    getInitialState() {
      return {
        dirty: false
      };
    },

    _emitChanges() {
      if (this.state.dirty) {
        this.setState({
          dirty: false
        });

        this.props.changeHandler(this.refs.input.value);
      }
    },

    mixins: [mixin],

    render() {
      return (
        <div className="filter">
          <div className='input-group'>
            <input ref='input' type='text' className='form-control input-sm' placeholder={placeholder}
                   onChange={this._handleChange} onKeyUp={this._handleKeyUp} onBlur={this._emitChanges}/>
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
