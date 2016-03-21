var React = require('react');
var { Col, Thumbnail } = require('react-bootstrap');

var PropTypes = React.PropTypes;

module.exports = React.createClass({
  propTypes: {
    book: PropTypes.object,
    key: PropTypes.number
  },

  render() {
    var { book, key } = this.props;

    return (
      <Col xs={6} sm={4} md={3} key={key} >
        <Thumbnail src={book.picture} alt='image'>
          <h3>{book.title}</h3>
          <p>{book.author}</p>
          <p>{book.year} {book.pages}</p>
          <p>Available: {book.count}</p>
        </Thumbnail>
      </Col>
    );
  }
});
