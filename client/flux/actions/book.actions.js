var alt = require('../alt');
var agent = require('superagent');

class BookActions {

  fetchBook(id) {
    return (dispatch) => {
      dispatch();

      agent
        .get(`api/book/${id}`)
        .end((err, res) => {
          if(err) {
            this.bookFailed(err);
          }
          this.updateBook(res.body);
        });
    }
  }

  bookFailed(error) {
    return error;
  }

  updateBook(book) {
    return book;
  }
}

module.exports = alt.createActions(BookActions);