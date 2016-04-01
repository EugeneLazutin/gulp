var React = require('react');

module.exports = (placeholder, array) => {
  return React.createClass({
    propTypes: {
      hideFilter: React.PropTypes.func,
      changeHandler: React.PropTypes.func
    },

    getInitialState() {
      return array[0];
    },

    componentDidMount() {
      this.props.changeHandler(this.state.value);
    },

    componentWillUnmount() {
      this.props.changeHandler();
      this.props.hideFilter();
    },

    _emitChanges(item) {
      return () => {
        this.setState(item);
        this.props.changeHandler(item.value);
      };
    },

    render() {
      return (
        <div className="filter">
          <div className="btn-group btn-group-sm">
            <button type='button' className='btn btn-sm btn-default dropdown-toggle border-fix' data-toggle='dropdown'
                    aria-haspopup='true'
                    aria-expanded='false'>{this.state.key} <span className="caret"></span></button>
            <ul className='dropdown-menu'>
              {array.map((item, i) => {
                return (
                  <li className={item.value == this.state.value ? 'active' : ''} key={i}>
                    <a className='empty-link' onClick={this._emitChanges(item)}>
                      {item.key}
                    </a>
                  </li>
                );
              })}
            </ul>

            <button className='btn btn-sm btn-danger' type='button' onClick={this.props.hideFilter}>
              <span className='glyphicon glyphicon-remove'></span>
            </button>

          </div>
        </div>
      );
    }
  });
};

