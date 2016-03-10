var React = require('react');
var actions = require('../../flux/actions/mainActions');
var store = require('../../flux/stores/mainStore');

var Page = React.createClass({
  getInitialState() {
    return store.getState();
  },

  componentWillMount() {
    this.listenTo(store, this._onChange);
  },

  _onChange() {
    this.setState(store.getState());
  },

  _setNewValue(evt) {
    actions.setValue(evt.target.value);
  },

  render: function () {
    return (
      <div>
        <label>{this.state.value}</label>
        <input value={this.state.value} onChange={this._setNewValue} />
      </div>
    );
  }
});

module.exports = Page;