var alt = require('../alt');
var mainActions = require('../actions/mainActions');
var ajax = require('superagent');
var cookie = require('react-cookie');

class mainStore {

  constructor() {
    this.bindActions(mainActions);

    this.value = 0;
  }

  onSetValue(newValue) {
    this.value = newValue;
  }

  onResetValue() {
    this.value = 0;
  }

  onLogin() {
    ajax
      .post('/auth')
      .send({
        email: 'eugene@mail',
        password: 'my_pass'
      })
      .end((err, res) => {
        if(err) {
          console.log(err);
        } else {
          console.log(res.body);
          cookie.save('token', res.body.token);
        }
      });
    return false;
  }

  onCreate() {
    var newUser = {
      email: 'eugene@mail',
      name: {
        first: 'eugene',
        last: 'lazutin'
      },
      password: 'my_pass',
      status: 1
    };

    ajax
      .post('/api/user')
      .send(newUser)
      .end((err, res) => {
        console.log(err || res);
      });
    return false;
  }

  onGet() {
    ajax
      .get('/api/user/me')
      .set('Authorization', 'Bearer ' + cookie.load('token'))
      .end((err, res) => {
      console.log(err || res);
    });
    return false;
  }

  ddd() {
    return '???';
  }
}

module.exports = alt.createStore(mainStore);