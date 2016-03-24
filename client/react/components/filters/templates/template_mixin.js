var { enter } = require('../../../../../config').keyCodes;

module.exports = {
  _handleKeyUp(evt) {
    if (evt.keyCode === enter) {
      this._emitChanges();
    }
  },

  _handleChange() {
    this.setState({
      dirty: true
    });
  }
};