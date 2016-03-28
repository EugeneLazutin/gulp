var React = require('react');
var bookService = require('../../../services/book');
var { hashHistory, browserHistory } = require('react-router');

module.exports = React.createClass({
  propTypes: {
    bookId: React.PropTypes.string
  },

  remove() {
    bookService
      .delete(this.props.bookId)
      .then(msg => {
        toastr.success(msg);
        hashHistory.push('/books');
      })
      .catch(err => {
        toastr.error(err);
      });
  },

  render() {
    return (
      <div>
        <button className="btn btn-info btn-block">
          Checkout
        </button>

        <button className="btn btn-danger btn-block" onClick={this.remove}>
          Delete
        </button>
      </div>
    );
  }
});

