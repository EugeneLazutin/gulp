var React = require('react');
var bookActions = require('../../../flux/actions/book.actions');
var orderService = require('../../../services/order');



module.exports = React.createClass({
  propTypes: {
    bookId: React.PropTypes.string
  },

  _makeOrder() {
    orderService
      .makeOrder(this.props.bookId)
      .then((res) => {
        bookActions.decAvailable(true);
        toastr.success('success');
        console.log(res.body);
      })
      .catch(err => {
        toastr.error(err);
      });
  },

  render() {
    return (
      <button className='btn btn-info btn-block' onClick={this._makeOrder}>
        Make order
      </button>
    );
  }
});

