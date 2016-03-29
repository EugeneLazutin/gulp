var alt = require('../alt');
var bookActions = require('../actions/book.actions');

var socket = io('/book');

class bookStore {
  constructor() {
    this.bindActions(bookActions);

    socket.on('decrement_available_count', id => {
      if (this.book && this.book._id === id) {
        bookActions.decrementAvailable();
      }
    });

    this.book = null;
  }

  onReceiveBook(book) {
    this.book = book;

    console.log(book);
  }

  onFetchBook() {
    this.book = null;
  }

  onOrderIsMade(order) {
    this.book.available--;
    socket.emit('booked', this.book._id);
  }

  onDecrementAvailable() {
    this.book.available--;
  }
}

module.exports = alt.createStore(bookStore);