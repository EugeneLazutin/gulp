var React = require('react');
var { ButtonInput } = require('react-bootstrap');
var { Form, ValidatedInput } = require('react-bootstrap-validation');
var agent = require('superagent');
var cookie = require('react-cookie');
var validator = require('validator');


var Login = React.createClass({

  handleValid(values){
    agent
      .post('/auth')
      .send(values)
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          console.log(res.body);
          cookie.save('token', res.body.token);
        }
      });
  },

  validate(email) {
    if(!email) {
      return 'Please enter your email.'
    }
    if(validator.isEmail(email, {require_tld: false})){
      return true;
    }
    return 'Email is invalid.'
  },

  render() {
    return (
      <Form onValidSubmit={this.handleValid}>

        <legend>Login</legend>

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

module.exports = Login;
