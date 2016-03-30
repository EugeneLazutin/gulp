var React = require('react');
var Comments = require('./comments');
var Orders = require('./orders');

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
      return <Orders />;
    }
    return <Comments />;
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
