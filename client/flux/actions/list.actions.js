var alt = require('../alt');
var agent = require('superagent');
var cookie = require('react-cookie');
var error = require('../error_handler');

class ListActions {

  fetch(params, url) {
    return (dispatch) => {
      dispatch();

      agent
        .post(url)
        .send(params)
        .set('Authorization', 'Bearer ' + cookie.load('token'))
        .end((err, res) => {
          if (err) {
            error(err);
          }
          this.receive(res.body);
        });
    }
  }

  receive(list) {
    return list;
  }
}

module.exports = alt.createActions(ListActions);