var alt = require('../alt');
var booksActions = require('../actions/books.actions');


class booksStore {
  constructor() {
    this.bindActions(booksActions);

    this.books = null;
    this.pages = 0;
  }

  onReceiveBooks(res) {
    this.books = res.docs;
    this.pages = res.pages;
  }

  onFetchBooks() {
    this.books = null;
  }
}

module.exports = alt.createStore(booksStore);