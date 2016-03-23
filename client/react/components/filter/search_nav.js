var React = require('react');
var { getFiltersList } = require('./filters');
var classNames = require('classnames');

module.exports = React.createClass({
  getInitialState() {
    return {
      filters: getFiltersList()
    };
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

  _allIsActive() {
    return this.state.filters.every(filter => {
      return filter.isActive;
    });
  },

  render() {

    var filterBtnClass = classNames({
      'btn btn-primary dropdown-toggle': true,
      'disabled': this._allIsActive()
    });

    return (
      <div className='search-panel'>

        {this.state.filters.map((filter, i) => {
          if (filter.isActive) {
            return <filter.Component key={i} hideFilter={this._createFilterToggle(filter, false)}/>;
          }
        })}


        <div className='dropdown pull-right'>
          <button className={filterBtnClass} type='button' data-toggle='dropdown'>
            <span className='glyphicon glyphicon-filter'></span>
          </button>
          <ul className='dropdown-menu'>
            {this.state.filters.map((filter, i) => {
              if (!filter.isActive) {
                return (
                  <li key={i}>
                    <a className='empty-link' onClick={this._createFilterToggle(filter, true)}>{filter.name}</a>
                  </li>
                );
              }
            })}
          </ul>
        </div>

      </div>
    );
  }
});