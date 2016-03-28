var alt = require('../alt');
var bookActions = require('../actions/book.actions');

var socket = io('/book');

class bookStore {
  constructor() {
    this.bindActions(bookActions);

    socket.on('booked', id => {
      if (this.book && this.book._id === id) {
        bookActions.decAvailable(false);
      }
    });

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

  onDecAvailable(userEvent) {
    if (this.book) {
      this.book.available -= 1;
      if (socket && userEvent) {
        socket.emit('booked', this.book._id);
      }
    }
  }
}

module.exports = alt.createStore(bookStore);