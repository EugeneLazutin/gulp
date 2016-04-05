var React = require('react');


var BoolFilterFactory = (text, value) => {
  return React.createClass({
    propTypes: {
      hideFilter: React.PropTypes.func,
      changeHandler: React.PropTypes.func
    },

    componentDidMount() {
      this.props.changeHandler(value);
    },

    componentWillUnmount() {
      this.props.changeHandler();
      this.props.hideFilter();
    },

    render() {
      return (
        <div className="filter">
          <div className='btn-group'>
              <label>{text} <span className="glyphicon glyphicon-ok"></span></label>
              <button className='btn btn-sm btn-danger' type='button' onClick={this.props.hideFilter}>
                <span className='glyphicon glyphicon-remove'></span>
              </button>
          </div>
        </div>
      );
    }
  });
};

module.exports = BoolFilterFactory;
