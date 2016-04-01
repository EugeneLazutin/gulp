var React = require('react');

var CommentForm = require('./comment_form');
var Comment = require('./comment');

module.exports = React.createClass({
  propTypes: {
    bookId: React.PropTypes.string,
    comments: React.PropTypes.array,
    isAuthorized: React.PropTypes.bool,
    isAdmin: React.PropTypes.bool
  },

  getInitialState()  {
    return {
      comments: this.props.comments,
      newComments: []
    };
  },

  _updateComments(comment) {
    if (comment.book === this.props.bookId) {
      this.state.newComments.push(comment);
      this.setState({
        newComments: this.state.newComments
      });
    }
  },

  componentDidMount()  {
    this.socket = io('/comment');
    this.socket.on('add_comment', this._updateComments);
    console.log('mount, socket - ', this.socket, this.socket.connected);
  },

  componentWillUnmount() {
    this.socket.removeListener('add_comment', this._updateComments);
    this.socket = null;
    console.log('unmount, socket - ', this.socket);
  },

  _handleClick()  {
    this.state.newComments.forEach(comment => {
      this.state.comments.push(comment);
    });
    this.setState({
      comments: this.state.comments,
      newComments: []
    });
  },

  _renderComments(comments)  {
    if (comments && comments.length) {
      return (
        comments.map((comment, i) => {
          return (
            <Comment key={i} comment={comment}/>
          );
        })
      );
    }
  },

  _renderCommentForm() {
    if (this.props.isAuthorized) {
      return (
        <CommentForm bookId={this.props.bookId}/>
      );
    }
  },

  _renderViewNewCommentsBtn(haveNewComments)  {
    if (haveNewComments) {
      return (
        <button className="btn btn-info btn-block btn-lg" onClick={this._handleClick}>view new comments</button>
      );
    }
  },

  render()  {
    var { comments, newComments } = this.state;

    return (
      <div className="comments">
        {this._renderCommentForm()}
        {this._renderComments(comments)}
        {this._renderViewNewCommentsBtn(!!newComments.length)}
      </div>
    );
  }
});

