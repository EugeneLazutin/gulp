var React = require('react');
var Buttons = require('./user_buttons');
var Comments = require('../comment/comments');


module.exports = React.createClass({
  propTypes: {
    book: React.PropTypes.object,
    isAuthorized: React.PropTypes.bool
  },

  render() {
    var { book, isAuthorized } = this.props;

    return <div className='book-details'>
      <div className="col-sm-4 text-center">
        <div className='picture'>
          <img className='img-rounded img-responsive' src={book.picture}/>

          <Buttons bookId={book._id} />

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