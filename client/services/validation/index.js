var { Validator } = require('react-bootstrap-validation');

/**
 * Can't pass parameter using ValidateInput.validate like
 * validate: "require,isEmail:{require_tdl:false}"
 * so pass manually
 */

exports.isEmail = (email) => {
  if (!email) {
    return 'Please enter your email.'
  }
  if (Validator.isEmail(email, {require_tld: false})) {
    return true;
  }
  return 'Email is invalid.'
};