var alt = require('../alt');
var userActions = require('../actions/user.actions');
var cookie = require('react-cookie');

class mainStore {
  constructor() {
    this.bindActions(userActions);
    this.user = null;
  }

  onSet({ user, token }) {
    this.user = user;
    cookie.save('toke', token);
  }

  onRemove() {
    this.user = null;
    cookie.remove('token');
  }

  static isAuthorized() {
    return this.state.user != null;
  }

  static fullName() {
    if(this.state.user) {
      return `${this.state.user.name.first} ${this.state.user.name.last}`;
    }
    return null;
  }
}

module.exports = alt.createStore(mainStore);