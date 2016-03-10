var alt = require('../alt');

class mainActions {

  setValue (newValue) {
    this.dispatch(newValue);
  }

  resetValue () {
    this.dispatch();
  }

}

module.exports = alt.createActions(mainActions);