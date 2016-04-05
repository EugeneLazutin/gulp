var React = require('react');
var moment = require('moment');


var Comment = React.createClass({
  propTypes: {
    comment: React.PropTypes.object
  },

  render() {
    var { comment } = this.props;

    if(comment.removed) {
      return (
        <div className="comment">
          <div>{moment(comment.date).calendar()} {comment.userName} wrote...</div>
          <div>but i will not show you =D</div>
        </div>
      );
    }

    return (
      <div className="comment">
        <div>{moment(comment.date).calendar()} {comment.userName} wrote:</div>
        <div>{comment.message}</div>
      </div>
    );
  }
});

module.exports = Comment;