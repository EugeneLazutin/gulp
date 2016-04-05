var { enter } = require('../../../../../config').keyCodes;


var mixin = {
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

module.exports = mixin;