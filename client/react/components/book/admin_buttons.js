var React = require('react');
var bookActions = require('../../../flux/actions/book.actions');

module.exports = React.createClass({
  propTypes: {
    bookId: React.PropTypes.string
  },

  remove() {
    bookActions.removeBook(this.props.bookId);
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

