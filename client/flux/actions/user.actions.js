var alt = require('../alt');
var agent = require('superagent');
var cookie = require('react-cookie');
var error = require('../error_handler');
var { hashHistory } = require('react-router');

class UserActions {
  tryFetchUser() {
    return dispatch => {
      dispatch();
      console.log('Try Fetch User');


      var token = cookie.load('token');

      if (token) {
        agent
          .get('/api/user/me')
          .set('Authorization', 'Bearer ' + token)
          .end((err, res) => {
            if (!err) {
              this.receiveUser(res.body);
            }
          });
      }
    }
  }

  receiveUser(user) {
    return user;
  }

  logout() {
    return dispatch => {
      dispatch();

      cookie.remove('token');
    }
  }

  login(userLogin) {
    return dispatch => {
      dispatch();
      this._sendAuth(userLogin, '/auth');
    }
  }

  register(user) {
    return dispatch => {
      dispatch();
      this._sendAuth(user, '/api/user');
    }
  }

  _sendAuth(user, url) {
    agent
      .post(url)
      .send(user)
      .end((err, res) => {
        if (err) {
          error(err);
        } else {
          this.receiveUser(res.body.user);
          cookie.save('token', res.body.token);
          hashHistory.push('/');
        }
      });
  }

}

module.exports = alt.createActions(UserActions);

