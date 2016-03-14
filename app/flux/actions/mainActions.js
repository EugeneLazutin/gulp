var alt = require('../alt');

class mainActions {

  constructor() {
    this.generateActions('resetValue', 'login', 'create', 'get');
  }

  setValue (newValue) {
    return newValue;
  }

}

module.exports = alt.createActions(mainActions);