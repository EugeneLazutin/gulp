var React = require('react');
var { Pagination } = require('react-bootstrap');
var Books = require('./../../components/book/books');
var SearchBar = require('../../components/search_bar');
var _ = require('lodash');
var { limit } = require('../../../../config/client/pagination');

var booksActions = require('../../../flux/actions/books.actions');
var booksStore = require('../../../flux/stores/books.store');

module.exports = React.createClass({
  getInitialState() {
    return {
      books: [],
      search: {},
      pagination: {
        page: 1,
        limit: limit.forBook
      },
      pages: 0
    };
  },

  componentDidMount() {
    booksStore.listen(this.onChange);
    this._fetch();
  },

  componentWillUnmount() {
    booksStore.unlisten(this.onChange);
  },

  onChange(state) {
    this.setState({
      books: state.books,
      pages: state.pages
    });
  },

  _fetch() {
    var params = {
      search: this.state.search,
      pagination: this.state.pagination
    };

    booksActions.fetchBooks(params);
  },

  _updateSearchParams({key, value}) {
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
      <div>
        <SearchBar changeHandler={this._updateSearchParams}/>
        <Books books={this.state.books} />
        <br/>
        {this._createPagination()}
      </div>
    );
  }
});