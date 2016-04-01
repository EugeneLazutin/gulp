var React = require('react');
var Comment = require('./comment.admin.js');
var _ = require('lodash');


var Comments = React.createClass({
  render() {
    var comments = this.props.children;

    if (!comments || !comments.length) {
      return <i>There are no comments for this book yet.</i>;
    }

    return (
      <table className="table">
        <thead>
        <tr>
          <th>
            User
          </th>
          <th>
            Date
          </th>
          <th>
            Comment
          </th>
          <th>
            Status
          </th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        {comments.map((comment, i) => {
          return <Comment comment={comment} key={i} />
        })}
        </tbody>
      </table>
    );
  }
});

module.exports = Comments;