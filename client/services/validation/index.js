var { Validator, FileValidator  } = require('react-bootstrap-validation');
var _ = require('lodash');

var imageType = /^image\//;

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

exports.isSingleImage = files => {
  if(!files || !files.length) {
    return 'Please select a file';
  }

  if(files.length > 1) {
    return 'Only one file required';
  }

  if(!imageType.test(files[0].type)) {
    return 'Image required';
  }

  return true;
};

exports.isImage = file => {
  return imageType.test(file.type);
};

exports.isNumber = (min, max) => {
  return value => {
    if(_.isUndefined(value) || !value.length) {
      return 'Required';
    }

    value = _.toNumber(value);

    if(!_.isNumber(value)) {
      return 'Value should be a number';
    }

    if(!_.isUndefined(min) && value <= min) {
      return `Value should be greater than ${min}`;
    }

    if(!_.isUndefined(max) && value >= max) {
      return `Value should be less than ${max}`;
    }

    return true;
  };
};