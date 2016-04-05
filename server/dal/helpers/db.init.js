var User = require('../models/user');
var roles = require('../../../config').roles;
var chalk = require('chalk');

exports.init = () => {
  User.count({}, (err, count) => {
    if (count == 0) {
      createAdmin();
    }
  });
};

function createAdmin() {
  var admin = {
    email: 'admin@1',
    password: '123',
    name: {
      first: 'admin',
      last: 'i am'
    },
    role: roles.admin
  };

  User.create(admin, (err) => {
    if(err) {
      return console.log(chalk.red(err));
    }

    console.log(chalk.green('Admin created!'));
    console.log(chalk.blue('email: ') + admin.email);
    console.log(chalk.blue('password: ') + admin.password);
  })
}