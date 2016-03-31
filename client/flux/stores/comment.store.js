var alt = require('../alt');
var commentActions = require('../actions/comment.actions');


class CommentStore {
  constructor() {
    this.bindActions(commentActions);

    this.comment = null;
  }

  onRemoveComment() {
    this.comment = null;
    return false;
  }

  onRestoreComment() {
    this.comment = null;
    return false;
  }

  onCommentToggled(comment) {
    this.comment = comment;
  }
}

module.exports = alt.createStore(CommentStore);