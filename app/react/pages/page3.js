var React = require('react');
var actions = require('../../flux/actions/mainActions');

var Page = React.createClass({
  render: function () {
    return (
      <div>
        Page 3
        <button className="btn btn-default" onClick={actions.create}>Create</button>
        <button className="btn btn-default" onClick={actions.login}>Login</button>
        <button className="btn btn-default" onClick={actions.get}>Get me</button>
      </div>
    );
  }
});

module.exports = Page;