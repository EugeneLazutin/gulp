var alt = require('../alt');
var fullUserActions = require('../actions/fullUser.actions');


class fullUserStore {
  constructor() {
    this.bindActions(fullUserActions);

    this.user = null;
  }

  onReceiveFullUser(user) {
    this.user = user;
  }

  onFetchFullUser() {
    this.user = null;
  }
}

module.exports = alt.createStore(fullUserStore);