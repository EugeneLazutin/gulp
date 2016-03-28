var alt = require('../alt');
var bookActions = require('../actions/book.actions');

class bookStore {
  constructor() {
    this.bindActions(bookActions);

    this.book = null;
  }

  onBookFailed(err) {
    console.log(err);
    toastr.error(err);
  }

  onUpdateBook(book) {
    this.book = book;
  }

  onFetchBook() {
    this.book = null;
  }
}

module.exports = alt.createStore(bookStore);