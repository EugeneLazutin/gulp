var React = require('react');
var Book = require('./book_grid');

module.exports = React.createClass({
  render() {
    var books = this.props.children;

    if(books) {
      return (
        <div className='books'>
          {books.map((book, i) => {
            return (<Book book={book} key={i}/>);
          })}
        </div>
      );
    } else {
      return (
        <div className="loader"/>
      );
    }
  }
});