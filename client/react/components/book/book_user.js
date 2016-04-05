var React = require('react');
var Comments = require('../comment/comments');
var bookActions = require('../../../flux/actions/book.actions');
var bookStore = require('../../../flux/stores/book.store');


var BookUser = React.createClass({
  propTypes: {
    bookId: React.PropTypes.string,
    isAuthorized: React.PropTypes.bool
  },

  componentDidMount() {
    bookStore.listen(this._onChange);
    bookActions.fetchBook(this.props.bookId, false);
  },

  componentWillUnmount() {
    bookStore.unlisten(this._onChange);
  },

  _onChange(state) {
    this.setState(state);
  },

  _makeOrder() {
    bookActions.makeOrder(this.props.bookId, this.state.book.title);
  },

  _renderButton() {
    if(this.props.isAuthorized && this.state.book.available > 0) {
      return (
        <button className='btn btn-info btn-block' onClick={this._makeOrder}>
          Make order
        </button>
      );
    }
  },

  render() {
    var { isAuthorized } = this.props;
    var book = this.state ? this.state.book : null;

    if(!book) {
      return <div className="loader" />;
    }

    return <div className='book-details'>
      <div className="col-sm-4 text-center">
        <div className='picture'>
          <img className='img-rounded img-responsive' src={book.picture}/>

          {this._renderButton()}

        </div>
      </div>
      <div className="col-sm-8">
        <div className='book-info'>

          <h2><span className='title'>{book.title}</span>
            <small>({book.year})</small>
          </h2>

          <p className='description'>
            {book.description}
            <small>({book.pages}p.)</small>
          </p>

          <p className='clearfix'>
            <span className='pull-right'>{book.available}/{book.count} available</span>
          </p>

          <Comments bookId={book._id} comments={book.comments} isAuthorized={isAuthorized} isAdmin={false}/>

        </div>
      </div>
    </div>
  }
});

module.exports = BookUser;