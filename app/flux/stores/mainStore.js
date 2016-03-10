var alt = require('../alt');
var mainActions = require('../actions/mainActions');

class mainStore {

  constructor() {
    this.bindActions(mainActions);

    this.value = 0;
  }

  onSetValue(newValue) {
    this.value = newValue;
  }

  onResetValue() {
    this.value = 0;
  }
}

module.exports = alt.createStore(mainStore);