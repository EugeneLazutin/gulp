var { Validator, FileValidator  } = require('react-bootstrap-validation');
var _ = require('lodash');

/**
 * Can't pass parameter using ValidateInput.validate like
 * validate: "require,isEmail:{require_tdl:false}"
 * so pass manually
 * @param email
 */

exports.isEmail = email => {
  if (!email) {
    return 'Please enter your email.'
  }
  if (!Validator.isEmail(email, {require_tld: false})) {
    return 'Email is invalid.';
  }
  return true;
};

/**
 * single image validation
 * @param files
 */

exports.filesRequired = files => {
  if(FileValidator.isEmpty(files)) {
    return 'Please select a file';
  }

  return true;
};

exports.isNumber = (min, max) => {
  return value => {
    if(_.isUndefined(value) || !value.length) {
      return 'required';
    }

    value = _.toNumber(value);

    if(!_.isNumber(value)) {
      return 'value should be a number';
    }

    if(!_.isUndefined(min) && value <= min) {
      return `value should be greater than ${min}`;
    }

    if(!_.isUndefined(max) && value >= max) {
      return `value should be less than ${max}`;
    }

    return true;
  };
};