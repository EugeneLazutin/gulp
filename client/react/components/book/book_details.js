var React = require('react');
var { Col } = require('react-bootstrap');

module.exports = React.createClass({
  propTypes: {
    book: React.PropTypes.object
  },

  render() {
    var { book } = this.props;

    return (
      <div className='book-details'>
        <Col sm={4} className='text-center'>
          <div className='picture'>
            <img className='img-rounded img-responsive' src={book.picture}/>

            <button className='btn btn-info btn-block'>
              Make order
            </button>

          </div>
        </Col>
        <Col sm={8}>
          <div className='book-info'>

            <h2><span className='title'>{book.title}</span> <small>({book.year})</small></h2>

            <p className='description'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to make a type
              specimen book. It has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was popularised in
              the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
              and more recently with desktop publishing software like Aldus PageMaker including
              versions of Lorem Ipsum. <small>({book.pages}p.)</small></p>

            <p className='clearfix'>
              <span className='pull-right'>{book.count} available</span>
            </p>

          </div>
        </Col>
      </div>
    );
  }
});