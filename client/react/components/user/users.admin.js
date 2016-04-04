var React = require('react');
var User = require('./user.admin.js');
var _ = require('lodash');


var Users = React.createClass({
  render() {
    var users = this.props.children;

    if (!users || !users.length) {
      return <i>There are no users yet.</i>;
    }

    return (
      <table className="table">
        <thead>
        <tr>
          <th>
            Name
          </th>
          <th>
            Email
          </th>
          <th>
            Status
          </th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        {users.map((user, i) => {
          return <User user={user} key={i} />
        })}
        </tbody>
      </table>
    );
  }
});

module.exports = Users;