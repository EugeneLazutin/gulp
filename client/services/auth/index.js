var agent = require('superagent');
var userActions = require('../../flux/actions/user.actions');

function send(user, url) {
  return new Promise((resolve, reject) => {
    agent
      .post(url)
      .send(user)
      .end((err, res) => {
        if (err) {
          reject(err);
        } else {
          userActions.set(res.body);
          resolve(res.body.user);
        }
      });
  });
}

exports.login = (user) => {
  return send(user, '/auth')
};

exports.register = (user) => {
  return send(user, '/api/user');
};

exports.logout = () => {
  userActions.remove();
};

