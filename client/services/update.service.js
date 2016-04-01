var agent = require('superagent');
var cookie = require('react-cookie');

function update(params, url) {
  return new Promise((resolve, reject) => {
    agent
      .post(url)
      .set('Authorization', 'Bearer ' + cookie.load('token'))
      .send(params)
      .end((err, res) => {
        if (err) {
          return reject(err);
        }

        resolve(res.body);
      });
  });
}

module.exports = update;