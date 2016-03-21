var React = require('react');
var { Grid } = require('react-bootstrap');
var Book = require('./../components/book');
var agent = require('superagent');
var { Link } = require('react-router');

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
        <Link to='/book/create'>create new one</Link>

        <Grid>
          {this.state.books.map((book, i) => {
            return (<Book book={book} key={i}/>);
          })}
        </Grid>

      </div>
    );
  }
});