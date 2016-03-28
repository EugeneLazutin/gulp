var alt = require('../alt');
var agent = require('superagent');

class BooksActions {

  fetchBooks(params) {
    return (dispatch) => {
      dispatch();

      agent
        .post('/api/book/all')
        .send(params)
        .end((err, res) => {
          if (err) {
            this.booksFailed(err);
          }
          this.updateBooks(res.body);
        });
    }
  }

  booksFailed(error) {
    return error;
  }

  updateBooks(books) {
    return books;
  }
}

module.exports = alt.createActions(BooksActions);