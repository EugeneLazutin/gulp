var React = require('react');
var Comments = require('./../comment/comments.admin.js');
var Orders = require('./../order/orders.admin.js');

module.exports = React.createClass({
  propTypes: {
    book: React.PropTypes.object
  },

  getInitialState() {
    return {
      ordersIsVisible: true
    };
  },

  _showOrders() {
    this.setState({
      ordersIsVisible: true
    });
  },

  _showComments(){
    this.setState({
      ordersIsVisible: false
    });
  },

  _renderBody() {
    if (this.state.ordersIsVisible) {
      return <Orders orders={this.props.book.orders} />;
    }
    return <Comments comments={this.props.book.comments} />;
  },

  render() {
    var { book } = this.props;
    var { ordersIsVisible } = this.state;

    return (
      <div className='book-details'>
        <h3>{book.title} <small>by</small> {book.author} <small>written in</small> {book.year}</h3>
        <ul className="nav nav-tabs">
          <li className={ordersIsVisible ? 'active' : ''}>
            <a className="empty-link" onClick={this._showOrders}>Orders</a>
          </li>
          <li className={ordersIsVisible ? '' : 'active'}>
            <a className="empty-link" onClick={this._showComments}>Comments</a>
          </li>
        </ul>
        {this._renderBody()}
      </div>
    );
  }
});
