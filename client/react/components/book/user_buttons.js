var React = require('react');
var bookActions = require('../../../flux/actions/book.actions');

module.exports = React.createClass({
  propTypes: {
    bookId: React.PropTypes.string
  },

  _makeOrder() {
    bookActions.makeOrder(this.props.bookId);
  },

  render() {
    return (
      <button className='btn btn-info btn-block' onClick={this._makeOrder}>
        Make order
      </button>
    );
  }
});

