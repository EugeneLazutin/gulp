var React = require('react');
var { ButtonInput } = require('react-bootstrap');
var { Form, ValidatedInput, Validator} = require('react-bootstrap-validation');
var _ = require('lodash');
var agent = require('superagent');


var Login = React.createClass({

  handleValid(values){
    var user = _.omit(values, ['firstName', 'lastName']);
    user.name = {
      first: values.firstName,
      last: values.lastName
    };

    agent
      .post('/api/user')
      .send(user)
      .end((err, res) => {
        console.log(err || res);
      });
  },

  validate(email) {
    if (!email) {
      return 'Please enter your email.'
    }
    if (Validator.isEmail(email, {require_tld: false})) {
      return true;
    }
    return 'Email is invalid.'
  },

  render() {
    return (
      <Form onValidSubmit={this.handleValid}>

        <legend>Register</legend>

        <ValidatedInput
          type="email"
          name="email"
          placeholder="Email"
          validate={this.validate}
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

        <ValidatedInput
          type="text"
          name="firstName"
          placeholder="First name"
          validate="required"
          errorHelp={{
            required: 'Please enter your first name.'
          }}
        />

        <ValidatedInput
          type="text"
          name="lastName"
          placeholder="Last name"
          validate="required"
          errorHelp={{
            required: 'Please enter your last name.'
          }}
        />

        <ButtonInput
          type='submit'
          bsSize='large'
          bsStyle='primary'
          value='Register me.'
          block
        />

      </Form>
    );
  }
});

module.exports = Login;
