var React = require('react');
var PropTypes = React.PropTypes;

module.exports = React.createClass({
  propTypes: {
    book: PropTypes.object,
    key: PropTypes.number
  },

  render() {
    var { book, key } = this.props;

    return (
      <div className='book' key={key}>
        <a href='#'>
          <img src={book.picture}/>
          <div>{book.title}</div>
        </a>
      </div>
    );
  }
});
