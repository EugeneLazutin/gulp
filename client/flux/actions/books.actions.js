var alt = require('../alt');
var agent = require('superagent');
var error = require('../error_handler');

class BooksActions {

  fetchBooks(params) {
    return (dispatch) => {
      dispatch();

      agent
        .post('/api/book/all')
        .send(params)
        .end((err, res) => {
          if (err) {
            error(err);
          }
          this.receiveBooks(res.body);
        });
    }
  }

  receiveBooks(books) {
    return books;
  }
}

module.exports = alt.createActions(BooksActions);