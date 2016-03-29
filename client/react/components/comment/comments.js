var React = require('react');

var CommentForm = require('./comment_form');
var Comment = require('./comment');

module.exports = React.createClass({
  propTypes: {
    bookId: React.PropTypes.string,
    comments: React.PropTypes.array
  },

  getInitialState() {
    return {
      comments: this.props.comments,
      newComments: []
    };
  },

  componentDidMount() {
    io('/comment').on('add_comment', comment => {
      this.state.newComments.push(comment);

      if(comment.bookInfo === this.props.bookId) {
        this.setState({
          newComments: this.state.newComments
        });
      }
    });
  },

  _handleClick() {
    this.state.newComments.forEach(comment => {
      this.state.comments.push(comment);
    });
    this.setState({
      comments: this.state.comments,
      newComments: []
    });
  },

  _renderComments(comments) {
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

  _renderViewNewCommentsBtn(haveNewComments) {
    if (haveNewComments) {
      return (
        <button className="btn btn-info btn-block btn-lg" onClick={this._handleClick}>view new comments</button>
      );
    }
  },

  render() {
    var { comments, newComments } = this.state;

    return (
      <div className="comments">
        <CommentForm bookId={this.props.bookId}/>

        {this._renderComments(comments)}

        {this._renderViewNewCommentsBtn(!!newComments.length)}

      </div>
    );
  }
});

