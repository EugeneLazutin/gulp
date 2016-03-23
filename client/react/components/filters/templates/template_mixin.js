var EnterKeyCode = 13;

module.exports = {
  _handleKeyUp(evt) {
    if (evt.keyCode === EnterKeyCode) {
      this._emitChanges();
    }
  },

  _handleChange() {
    this.setState({
      dirty: true
    });
  }
};