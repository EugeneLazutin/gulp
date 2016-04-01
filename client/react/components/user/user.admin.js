var React = require('react');
var classNames = require('classnames');
var userService = require('../../../services/user.service');
var _ = require('lodash');

var User = React.createClass({
  propTypes: {
    user: React.PropTypes.object
  },

  getInitialState() {
    return this.props.user;
  },

  _statusClass() {
    return classNames({
      'alert alert-status': true,
      'alert-danger': this.state.blocked,
      'alert-success': !this.state.blocked
    });
  },

  _status() {
    return this.state.blocked ? 'blocked' : 'active';
  },

  _block() {
    userService
      .blockUser(this.state._id)
      .then(this._updateUser)
      .catch(this._handleError);
  },

  _unblock() {
    userService
      .unblockUser(this.state._id)
      .then(this._updateUser)
      .catch(this._handleError);
  },

  _updateUser(updates) {
    this.setState(updates);
  },

  _handleError(err) {
    console.log(err);
  },

  _buttons() {
    if (this.state.blocked) {
      return <button className="btn btn-danger btn-xs" onClick={this._unblock}>Unblock</button>;
    }
    return <button className="btn btn-info btn-xs" onClick={this._block}>Block</button>;
  },

  render() {
    var user = this.state;

    return (
      <tr>
        <td>{user.name.first + ' ' + user.name.last}</td>
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

module.exports = User;