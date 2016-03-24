var React = require('react');
var PropTypes = React.PropTypes;
var { Link } = require('react-router');

module.exports = React.createClass({
  propTypes: {
    book: PropTypes.object,
    key: PropTypes.number
  },

  render() {
    var { book, key } = this.props;

    return (
      <div className='book' key={key}>
        <Link to={`/book/${book._id}`}>
          <img className='img-rounded' src={book.picture}/>
          <div>{book.title}</div>
        </Link>
      </div>
    );
  }
});
