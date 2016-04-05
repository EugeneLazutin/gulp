var React = require( 'react');
var { ButtonInput } = require( 'react-bootstrap');
var { Form, ValidatedInput } = require( 'react-bootstrap-validation');
var _ = require( 'lodash');
var isEmail = require( '../../../services/validation').isEmail;
var config = require('../../../../config/index');
var userActions = require('../../../flux/actions/user.actions.js');


var Register = React.createClass({

  handleValid(values){
    var user = _.omit(values, ['firstName', 'lastName']);
    user.name = {
      first: values.firstName,
      last: values.lastName
    };

    userActions.register(user);
  },

  render() {
    return (
      <Form onValidSubmit={this.handleValid}>

        <legend>Register</legend>

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

module.exports = Register;