var React = require('react');
var commentStore = require('../../../flux/stores/comment.store.js');
var Comment = require('./comment.admin.js');
var _ = require('lodash');



var Comments = React.createClass({
  propTypes: {
    comments: React.PropTypes.array
  },

  getInitialState() {
    return {
      comments: this.props.comments
    };
  },

  componentDidMount() {
    commentStore.listen(this.updateComment);
  },

  componentWillUnmount() {
    commentStore.unlisten(this.updateComment);
  },

  updateComment(state) {
    var index = _.findIndex(this.state.comments, comment => {
      return comment._id === state.comment._id;
    });

    if (index != -1) {
      _.assign(this.state.comments[index], state.comment);
      this.setState(this.state);
    }
  },

  render() {
    var { comments } = this.props;

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