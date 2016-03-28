var agent = require('superagent');
var cookie = require('react-cookie');

exports.create = book => {
  return new Promise((resolve, reject) => {
    agent
      .post('/api/book')
      .send(book)
      .end((err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res.body);
        }
      });
  });
};

exports.delete = id => {
  return new Promise((resolve, reject) => {
    agent
      .delete(`/api/book/${id}`)
      .set('Authorization', 'Bearer ' + cookie.load('token'))
      .end((err, res) => {
        if(err) {
          reject(err);
        } else {
          resolve(res.body);
        }
      });
  });
};