var alt = require('../alt');
var userActions = require('../actions/user.actions');
var roles = require('../../../config').roles;


class userStore {
  constructor() {
    this.bindActions(userActions);

    this.user = null;
    this.isAuthorized = false;
    this.isAdmin = false;
  }

  onReceiveUser(user) {

    console.log(user);

    this.user = user;
    this.isAuthorized = true;
    this.isAdmin = user.role === roles.admin;
  }

  onLogout() {
    this.user = null;
    this.isAuthorized = false;
    this.isAdmin = false;
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