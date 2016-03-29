var alt = require('../alt');
var agent = require('superagent');
var cookie = require('react-cookie');
var error = require('../error_handler');
var { hashHistory } = require('react-router');

class BookActions {
  fetchBook(bookId) {
    return dispatch => {
      dispatch();

      agent
        .get(`api/book/${bookId}`)
        .end((err, res) => {
          if (err) {
            error(err);
          } else {
            this.receiveBook(res.body);
          }
        });
    }
  }

  decrementAvailable() {
    return dispatch => {
      dispatch();
    }
  }

  receiveBook(book) {
    return book;
  }

  orderIsMade(order) {
    return order;
  }

  makeOrder(bookId) {
    return dispatch => {
      dispatch();

      agent
        .post('/api/order')
        .send({id: bookId})
        .set('Authorization', 'Bearer ' + cookie.load('token'))
        .end((err, res) => {
          if (err) {
            return error(err);
          } else {
            this.orderIsMade(res.body);
          }
        });
    }
  }

  createBook(book) {
    return dispatch => {
      dispatch();

      agent
        .post('/api/book')
        .send(book)
        .end((err, res) => {
          if (err) {
            error(err);
          } else {
            hashHistory.push('/books');
          }
        });
    }
  }

  removeBook(bookId) {
    return dispatch => {
      dispatch();

      agent
        .delete(`/api/book/${bookId}`)
        .set('Authorization', 'Bearer ' + cookie.load('token'))
        .end((err, res) => {
          if (err) {
            error(err);
          } else {
            hashHistory.push('/books');
          }
        });
    }
  }
}

module.exports = alt.createActions(BookActions);