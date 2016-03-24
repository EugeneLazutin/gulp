var React = require('react');
var { Pagination } = require('react-bootstrap');
var Book = require('./../../components/book/book_grid');
var SearchBar = require('../../components/search_bar');
var bookService = require('../../../services').book;
var _ = require('lodash');
var { limit } = require('../../../../config/client/pagination');

module.exports = React.createClass({
  getInitialState() {
    return {
      books: [],
      search: {},
      pagination: {
        page: 1,
        limit: limit.forBook
      },
      pages: 0,
      total: 0
    };
  },

  componentWillMount() {
    this._fetch();
  },

  _fetch() {
    var params = {
      search: this.state.search,
      pagination: this.state.pagination
    };

    bookService
      .getBooks(params)
      .then(res => {
        this.setState({
          books: res.docs,
          pages: res.pages
        });
      })
      .catch(err => {
        console.log(err);
        toastr.error('Could not get books.');
      });
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

        <div className='books'>
          {this.state.books.map((book, i) => {
            return (<Book book={book} key={i}/>);
          })}
        </div>

        <br/>

        {this._createPagination()}

      </div>
    );
  }
});