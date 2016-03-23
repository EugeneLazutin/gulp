var React = require('react');
var Book = require('./../../components/book/book_grid');
var agent = require('superagent');
var SearchPanel = require('../../components/search_nav');
var bookService = require('../../../services').book;

module.exports = React.createClass({
  getInitialState() {
    return {
      books: [],
      searchParams: {}
    };
  },

  componentWillMount() {
    this._fetch();
  },

  _fetch(params) {
    bookService
      .getBooks(params)
      .then(books => {
        this.setState({
          books: books
        });
      })
      .catch(err => {
        toastr.error('Could not get books.');
      });
  },

  _updateSearchParams({key, value}) {
    this.state.searchParams[key] = value;

    this.setState({
      searchParams: this.state.searchParams
    }, () => {
      this._fetch(this.state.searchParams);
    });
  },

  render() {
    return (
      <div>

        <SearchPanel changeHandler={this._updateSearchParams}/>

        <div className='books'>
          {this.state.books.map((book, i) => {
            return (<Book book={book} key={i}/>);
          })}
        </div>

      </div>
    );
  }
});