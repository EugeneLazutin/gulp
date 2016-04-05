var React = require('react');
var { Pagination } = require('react-bootstrap');
var SearchBar = require('../components/search_bar');
var _ = require('lodash');
var listActions = require('../../flux/actions/list.actions');
var listStore = require('../../flux/stores/list.store');

function createListPage(Component, filters, limit, url, renderButton) {
  return React.createClass({
    getInitialState() {
      return {
        list: [],
        search: {},
        pagination: {
          page: 1,
          limit: limit
        },
        pages: 0
      };
    },

    componentDidMount() {
      listStore.listen(this.onChange);
      this._fetch();
    },

    componentWillUnmount() {
      listStore.unlisten(this.onChange);
    },

    onChange(state) {
      this.setState(state);
    },

    _fetch() {
      var params = {
        search: this.state.search,
        pagination: this.state.pagination
      };

      listActions.fetch(params, url);
    },

    _updateSearchParams({key, value}) {
      console.log(key, ' -  ', value);

      this.state.search[key] = value;
      this.state.pagination.page = 1;


      this.setState({
        search: this.state.search,
        pagination: this.state.pagination
      }, this._fetch);
    },

    _onPageChange(evt) {
      var page = _.toNumber(evt.target.text);

      if (!_.isNaN(page)) {
        this._setPage(page);
      }
    },

    _setPage(page) {
      this.state.pagination.page = page;

      this.setState({
        pagination: this.state.pagination
      }, this._fetch);
    },

    _createPagination() {
      if (this.state.pages > 1) {
        return (
          <div className='pagination-wrapper'>
            <Pagination
              bsSize='small'
              items={this.state.pages}
              activePage={this.state.pagination.page}
              onSelect={this._onPageChange}/>
          </div>
        );
      }
    },

    render() {
      return (
        <div className="container">
          <SearchBar changeHandler={this._updateSearchParams} filters={filters}>
            {(() => {
              if(renderButton) {
                return renderButton();
              }
            })()}
          </SearchBar>
          <Component>{this.state.list}</Component>
          <br/>
          {this._createPagination()}
        </div>
      );
    }
  });
}

module.exports = createListPage;