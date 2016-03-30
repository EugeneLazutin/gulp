var React = require('react');
var { Col } = require('react-bootstrap');
var bookActions = require('../../../flux/actions/book.actions');
var bookStore = require('../../../flux/stores/book.store');
var userStore = require('../../../flux/stores/user.store');

var UserButtons = require('../../components/book/user_buttons');
var AdminButtons = require('../../components/book/admin_buttons');

var Comments = require('../../components/comment/comments');

module.exports = React.createClass({
  getInitialState() {
    return bookStore.getState();
  },

  componentDidMount() {
    bookStore.listen(this.onChange);
    bookActions.fetchBook(this.props.params.id);
  },

  componentWillUnmount() {
    bookStore.unlisten(this.onChange);
  },

  onChange(state) {
    this.setState(state);
  },

  _renderButtons() {
    if (userStore.isAdmin()) {
      return <AdminButtons bookId={this.state.book._id}/>;
    } else if (userStore.isAuthorized()) {
      return <UserButtons bookId={this.state.book._id}/>;
    }
  },

  render() {
    var { book } = this.state;

    if (!book) {
      return (
        <div>Loading...</div>
      );
    }

    return (
      <div className="container">
        <div className='book-details'>
          <Col sm={4} className='text-center'>
            <div className='picture'>
              <img className='img-rounded img-responsive' src={book.picture}/>

              {this._renderButtons()}

            </div>
          </Col>
          <Col sm={8}>
            <div className='book-info'>

              <h2><span className='title'>{book.title}</span>
                <small>({book.year})</small>
              </h2>

              <p className='description'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type
                specimen book. It has survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was popularised in
                the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                and more recently with desktop publishing software like Aldus PageMaker including
                versions of Lorem Ipsum.
                <small>({book.pages}p.)</small>
              </p>

              <p className='clearfix'>
                <span className='pull-right'>{book.available}/{book.count} available</span>
              </p>

              <Comments bookId={book._id} comments={book.comments} />

            </div>
          </Col>
        </div>
      </div>
    );
  }
});