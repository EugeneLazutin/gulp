var agent = require('superagent');
var cookie = require('react-cookie');

exports.makeOrder = id => {
  return new Promise((resolve, reject) => {
    agent
      .post('/api/order')
      .send({ id })
      .set('Authorization', 'Bearer ' + cookie.load('token'))
      .end((err, res) => {
        if(err) {
          return reject(err);
        }
        resolve(res.body);
      });
  });
};