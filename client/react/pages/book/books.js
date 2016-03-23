var React = require('react');
var Book = require('./../../components/book/book_grid');
var agent = require('superagent');
var SearchPanel = require('../../components/search_nav');

module.exports = React.createClass({
  getInitialState() {
    return {
      books: []
    };
  },

  componentWillMount() {
    this.req = agent
      .get('/api/book')
      .end((err, res) => {
        if (err) {
          console.log(err);
          toastr.error('can`t fetch books');
        }
        this.setState({
          books: res.body
        });
      });
  },

  componentWillUnmount() {
    this.req.abort();
  },

  render() {
    return (
      <div>

        <SearchPanel />

        <div className='books'>
          {this.state.books.map((book, i) => {
            return (<Book book={book} key={i}/>);
          })}
        </div>

      </div>
    );
  }
});