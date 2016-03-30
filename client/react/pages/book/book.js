var React = require('react');
var bookActions = require('../../../flux/actions/book.actions');
var bookStore = require('../../../flux/stores/book.store');
var userStore = require('../../../flux/stores/user.store');
var _ = require('lodash');

var BookUser = require('../../components/book/book_user');
var BookAdmin = require('../../components/book/book_admin');

module.exports = React.createClass({
  getInitialState() {
    var auth = {
      isAuthorized: userStore.getState().isAuthorized,
      isAdmin: userStore.getState().isAdmin
    };

    return _.assign(auth, bookStore.getState());
  },

  componentDidMount() {
    bookStore.listen(this.onChangeBook);
    userStore.listen(this.onChangeUser);
    bookActions.fetchBook(this.props.params.id, this.state.isAdmin);
  },

  componentWillUnmount() {
    bookStore.unlisten(this.onChangeBook);
    userStore.unlisten(this.onChangeUser);
  },

  onChangeBook(state) {
    this.setState(state);
  },

  onChangeUser(state) {
    this.setState(_.omit(state, ['user']));
  },

  render() {
    var { book, isAdmin, isAuthorized } = this.state;

    if (!book) {
      return <div className="loader" />;
    }

    return (
      <div className="container">
        {(() => {
          if(isAdmin) {
            return <BookAdmin book={book} />
          } else {
            return <BookUser book={book} isAuthorized={isAuthorized} />
          }
        })()}
      </div>
    );
  }
});