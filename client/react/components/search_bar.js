var React = require('react');
var classNames = require('classnames');
var userStore = require('../../flux/stores/user.store');


module.exports = React.createClass({
  propTypes: {
    changeHandler: React.PropTypes.func,
    filters: React.PropTypes.array
  },

  getInitialState() {
    return {
      filters: this.props.filters,
      isAdmin: userStore.getState().isAdmin
    };
  },

  componentDidMount() {
    userStore.listen(this.onChange);
  },

  componentWillUnmount() {
    userStore.unlisten(this.onChange);
  },

  onChange(state) {
    this.setState({
      isAdmin: state.isAdmin
    });
  },

  _createFilterToggle(filter, isActive) {
    return evt => {
      filter.isActive = isActive;
      this._updateState();
    };
  },

  _updateState() {
    this.setState({
      filters: this.state.filters
    });
  },

  _hasActiveFilters() {
    return this.state.filters.some(filter => {
      return filter.isActive;
    });
  },

  _isAllActive() {
    return this.state.filters.every(filter => {
      return filter.isActive;
    });
  },

  _createHandler(filter) {
    return value => {
      this.props.changeHandler({
        key: filter.name,
        value: value
      });
    };
  },

  render() {
    var filterBtnClass = classNames({
      'btn btn-primary dropdown-toggle btn-sm': true,
      'disabled': this._isAllActive()
    });

    return (
      <div className='panel search-panel'>
        <div className='filters'>
          {this.state.filters.map((filter, i) => {
            if (filter.isActive) {
              return (
                <filter.Component
                  key={i}
                  hideFilter={this._createFilterToggle(filter, false)}
                  changeHandler={this._createHandler(filter)}
                />
              );
            }
          })}
        </div>

        <div className='buttons'>
          <div className='dropdown'>
            <button className={filterBtnClass} type='button' data-toggle='dropdown'>
              <span className='glyphicon glyphicon-filter'></span>
            </button>
            <ul className='dropdown-menu pull-right'>
              {this.state.filters.map((filter, i) => {
                if (!filter.isActive) {
                  return (
                    <li key={i}>
                      <a className='empty-link' onClick={this._createFilterToggle(filter, true)}>{filter.text}</a>
                    </li>
                  );
                }
              })}
            </ul>
          </div>

          {this.props.children}

        </div>
      </div>
    );
  }
});
