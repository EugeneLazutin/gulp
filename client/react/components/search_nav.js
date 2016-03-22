var React = require('react');
var Filter = require('./filter');
var titleFilter = require('./actions/title');
var authorFilter = require('./actions/author');

module.exports = React.createClass({
  getInitialState() {
    return {
      filters: [titleFilter]
    };
  },

  createHandler(i) {

    var self = this;

    return function (evt) {
      self.state.filters[i].isActive = true;

      self.setState({
        filters: self.state.filters
      });
    };

  },

  render() {
    return (
      <div className='search-panel'>
        {this.state.filters.map((filter, i) => {
          if(filter.isActive) {
            return <filter.Component key={i} />;
          }
        })}

        <Filter>
          {this.state.filters.map((filter, i) => {
            if(!filter.isActive) {
              return (
                <li key={i}><a className='empty-link' onClick={this.createHandler(i)} >{filter.name}</a></li>
              );
            }
          })}

        </Filter>
      </div>
    );
  }
});