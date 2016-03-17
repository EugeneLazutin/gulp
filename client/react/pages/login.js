var React = require('react');
var { ButtonInput } = require('react-bootstrap');
var { Form, ValidatedInput } = require('react-bootstrap-validation');
var { login, isEmail} = require('../../services');
var { browserHistory } = require('react-router');

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
          validate="required,isLength:6:60"
          errorHelp={{
            required: 'Please specify your password.',
            isLength: 'Password must be at least 6 characters.'
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
