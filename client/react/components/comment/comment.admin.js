var React = require('react');
var classNames = require('classnames');
var commentService = require('../../../services/comment.service');
var _ = require('lodash');
var moment = require('moment');


var Comment = React.createClass({
  propTypes: {
    comment: React.PropTypes.object
  },

  getInitialState() {
    return this.props.comment;
  },

  _statusClass() {
    return classNames({
      'alert alert-status': true,
      'alert-danger': this.state.removed,
      'alert-info': !this.state.removed
    });
  },

  _status() {
    return this.state.removed ? 'removed' : 'active';
  },

  _remove() {
    commentService
      .removeComment(this.state._id)
      .then(this._updateComment)
      .catch(this._handleError);
  },

  _restore() {
    commentService
      .restoreComment(this.state._id)
      .then(this._updateComment)
      .catch(this._handleError);
  },

  _updateComment(updates) {
    this.setState(updates);
  },

  _handleError(err) {
    console.log(err);
  },

  _buttons() {
    if (this.state.removed) {
      return <button className="btn btn-danger btn-xs" onClick={this._restore}>Restore</button>;
    }
    return <button className="btn btn-info btn-xs" onClick={this._remove}>Remove</button>;
  },

  render() {
    var comment = this.state;

    return (
      <tr>
        <td>{comment.userName}</td>
        <td>{moment(comment.date).format('LL')}</td>
        <td>{comment.message}</td>
        <td>
          <div className={this._statusClass()}>
            {this._status()}
          </div>
        </td>
        <td>
          {this._buttons()}
        </td>
      </tr>
    );
  }
});

module.exports = Comment;