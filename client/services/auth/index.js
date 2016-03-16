var agent = require('superagent');
var cookie = require('react-cookie');


function send(user, url) {
  return new Promise((resolve, reject) => {
    agent
      .post(url)
      .send(user)
      .end((err, res) => {
        if (err) {
          reject(err);
        } else {
          cookie.save('token', res.body.token);
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

