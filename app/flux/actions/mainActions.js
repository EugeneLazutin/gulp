var alt = require('../alt');

class mainActions {

  constructor() {
    this.generateActions('resetValue');
  }

  setValue (newValue) {
    return newValue;
  }

}

module.exports = alt.createActions(mainActions);