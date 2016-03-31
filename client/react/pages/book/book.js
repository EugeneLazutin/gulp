var React = require('react');
var userStore = require('../../../flux/stores/user.store');
var _ = require('lodash');
var BookUser = require('../../components/book/book_user');
var BookAdmin = require('../../components/book/book_admin');


var BookPage = React.createClass({
  getInitialState() {
    return _.omit(userStore.getState(), ['user']);
  },

  componentDidMount() {
    userStore.listen(this._onChange);
  },

  componentWillUnmount() {
    userStore.unlisten(this._onChange);
  },

  _onChange(state) {
    this.setState(_.omit(state, ['user']));
  },

  render() {
    var { isAdmin, isAuthorized } = this.state;

    return (
      <div className="container">
        {(() => {
          if (isAdmin) {
            return <BookAdmin bookId={this.props.params.id}/>
          } else {
            return <BookUser bookId={this.props.params.id} isAuthorized={isAuthorized}/>
          }
        })()}
      </div>
    );
  }
});

module.exports = BookPage;