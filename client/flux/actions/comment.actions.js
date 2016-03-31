var alt = require('../alt');
var agent = require('superagent');
var cookie = require('react-cookie');
var error = require('../error_handler');
var { hashHistory } = require('react-router');

class CommentActions {
  removeComment(commentId) {
    return dispatch => {
      dispatch();

      this._toggleComment(commentId, true);
    };
  }

  restoreComment(commentId) {
    return dispatch => {
      dispatch();

      this._toggleComment(commentId, false);
    };
  }

  commentToggled(comment) {
    return comment;
  }

  _toggleComment(commentId, removed) {
    agent
      .post('/api/comment/set-removed')
      .set('Authorization', 'Bearer ' + cookie.load('token'))
      .send({
        id: commentId,
        removed: removed
      })
      .end((err, res) => {
        if (err) {
          error(err);
        }

        this.commentToggled(res.body);
      });
  }
}

module.exports = alt.createActions(CommentActions);
