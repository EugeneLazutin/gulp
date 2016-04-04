var alt = require('../alt');
var agent = require('superagent');
var cookie = require('react-cookie');
var error = require('../error_handler');
var { hashHistory } = require('react-router');
var apis = require('../../../config/client').apis;


class BookActions {
  fetchBook(bookId, isAdmin) {
    return dispatch => {
      dispatch();

      var request;

      if (isAdmin) {
        request = agent
          .get(`${apis.bookAdmin}/${bookId}`)
          .set('Authorization', 'Bearer ' + cookie.load('token'));
      } else {
        request = agent
          .get(`${apis.book}/${bookId}`);
      }

      request.end((err, res) => {
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

  makeOrder(bookId, title) {
    return dispatch => {
      dispatch();

      agent
        .post(apis.order)
        .send({id: bookId, title: title})
        .set('Authorization', 'Bearer ' + cookie.load('token'))
        .end((err, res) => {
          if (err) {
            return error(err);
          } else {
            toastr.success('Order is made.');
            this.orderIsMade(res.body);
          }
        });
    }
  }

  createBook(book) {
    return dispatch => {
      dispatch();

      agent
        .post(apis.book)
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

  createComment(comment) {
    return dispatch => {
      dispatch();

      agent
        .post(apis.comment)
        .send(comment)
        .set('Authorization', 'Bearer ' + cookie.load('token'))
        .end((err, res) => {
          if (err) {
            error(err);
          }
        })
    }
  }

  removeBook(bookId) {
    return dispatch => {
      dispatch();

      agent
        .delete(`${apis.book}/${bookId}`)
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