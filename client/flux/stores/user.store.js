var alt = require('../alt');
var userActions = require('../actions/user.actions');
var roles = require('../../../config').roles;


class userStore {
  constructor() {
    this.bindActions(userActions);

    this.user = null;
  }

  onReceiveUser(user) {
    this.user = user;
  }

  onLogout() {
    this.user = null;
  }

  static isAuthorized() {
    return this.state.user != null;
  }

  static isAdmin() {
    if(this.state.user) {
      return this.state.user.role === roles.admin;
    }
    return false;
  }

  static fullName() {
    if (this.state.user) {
      return `${this.state.user.name.first} ${this.state.user.name.last}`;
    }
    return null;
  }
}

module.exports = alt.createStore(userStore);