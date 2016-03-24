var React = require('react');
var { book } = require('../../../services');
var BookDetails = require('../../components/book/book_details');


module.exports = React.createClass({
  getInitialState() {
    return {
      book: null
    }
  },

  _fetch() {
    book
      .getBook(this.props.params.id)
      .then(book => {
        this.setState({book});
      })
      .catch(err => {
        console.log(err);
        toastr.error('Could not get book.');
      })
  },

  _renderBook(){
    if (this.state.book) {
      return <BookDetails book={this.state.book}/>;
    }
  },

  componentWillMount() {
    this._fetch();
  },

  render() {
    return (
      <div className='container'>
        {this._renderBook()}
      </div>
    );
  }
});