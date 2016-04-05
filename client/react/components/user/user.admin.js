var React = require('react');
var classNames = require('classnames');
var userService = require('../../../services/user.service');
var userStore = require('../../../flux/stores/user.store');
var _ = require('lodash');
var { Link } = require('react-router');
var roles = require('../../../../config').roles;


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

  _role(role) {
    if(role == roles.admin) {
      return 'admin';
    }
    if(role == roles.user) {
      return 'user';
    }
    return 'role is not specified';
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

  _changeRole() {
    var newRole = this.state.role == roles.admin ?
      roles.user : roles.admin;

    userService
      .changeRole(this.state._id, newRole)
      .then(this._updateUser)
      .catch(this._handleError);
  },

  _updateUser(updates) {
    this.setState(updates);
  },

  _handleError(err) {
    toastr.error(err);
  },

  _buttons() {
    var blockedBtn = this.state.blocked ?
      <button className="btn btn-danger" onClick={this._unblock}>Unblock</button>:
      <button className="btn btn-info" onClick={this._block}>Block</button>;
    var roleBtn = this.state._id != userStore.getId() ?
      <button className="btn btn-default" onClick={this._changeRole}>Change role</button>:
      null;

    return (
      <div className="btn-group btn-group-xs">
        {blockedBtn}
        {roleBtn}
      </div>
    );
  },

  render() {
    var user = this.state;

    return (
      <tr>
        <td>
          <Link to={`/user/${user._id}`}>
            {user.name.first + ' ' + user.name.last}
          </Link>
        </td>
        <td>
          {user.email}
        </td>
        <td>
          {this._role(user.role)}
        </td>
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