var alt = require('../alt');
var listActions = require('../actions/list.actions');


class listStore {
  constructor() {
    this.bindActions(listActions);

    this.list = null;
    this.pages = 0;
  }

  onReceive(res) {
    this.list = res.docs;
    this.pages = res.pages;
  }

  onFetch() {
    this.list = null;
  }
}

module.exports = alt.createStore(listStore);