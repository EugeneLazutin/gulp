var React = require('react');


module.exports = React.createClass({
  propTypes: {
    book: React.PropTypes.object
  },

  render() {
    var { book } = this.props;

    console.log(book);

    return <div className='book-details'>
      Book Admin
    </div>
  }
});