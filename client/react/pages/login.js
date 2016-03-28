var React = require('react');
var { ButtonInput } = require('react-bootstrap');
var { Form, ValidatedInput } = require('react-bootstrap-validation');
var services = require('../../services');
var { browserHistory } = require('react-router');
var config = require('../../../config');

var login = services.auth.login;
var isEmail = services.validation.isEmail;

module.exports = React.createClass({

  handleValid(values) {
    login(values)
      .then((user) => {
        toastr.success('successfully logged');
        browserHistory.push('/');
      })
      .catch((err) => {
        console.log('error', err);
      });
  },

  render() {
    return (
      <Form onValidSubmit={this.handleValid}>

        <legend>Login</legend>

        <ValidatedInput
          type="email"
          name="email"
          placeholder="Email"
          validate={isEmail}
        />

        <ValidatedInput
          type="password"
          name="password"
          placeholder="Password"
          validate={`required,isLength:${config.passwordMinLength}`}
          errorHelp={{
            required: 'Please specify your password.',
            isLength: `Password must be at least ${config.passwordMinLength} characters.`
          }}
        />

        <ButtonInput
          type='submit'
          bsSize='large'
          bsStyle='primary'
          value='Let me in.'
          block
        />

      </Form>
    );
  }
});
