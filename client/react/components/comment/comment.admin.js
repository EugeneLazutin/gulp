var React = require('react');
var classNames = require('classnames');
var commentActions = require('../../../flux/actions/comment.actions.js');
var _ = require('lodash');
var moment = require('moment');

var Comment = React.createClass({
  propTypes: {
    comment: React.PropTypes.object
  },

  _statusClass() {
    return classNames({
      'alert alert-status': true,
      'alert-danger': this.props.comment.removed,
      'alert-info': !this.props.comment.removed
    });
  },

  _status() {
    return this.props.comment.removed ? 'removed' : 'active';
  },

  _remove() {
    commentActions.removeComment(this.props.comment._id);
  },

  _restore() {
    commentActions.restoreComment(this.props.comment._id);
  },

  _buttons() {
    if (this.props.comment.removed) {
      return <button className="btn btn-danger btn-xs" onClick={this._restore}>Restore</button>;
    }
    return <button className="btn btn-info btn-xs" onClick={this._remove}>Remove</button>;
  },

  render() {
    var { comment } = this.props;

    return (
      <tr>
        <td>{comment.user.name.first + ' ' + comment.user.name.last}</td>
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