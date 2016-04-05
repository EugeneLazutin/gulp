var React = require('react');
var { ButtonInput } = require('react-bootstrap');
var { Form, ValidatedInput } = require('react-bootstrap-validation');
var isNumber = require('../../../services/validation').isNumber;
var file2base64 = require('../../../services/image').file2base64;
var ImagePicker = require('../../components/image_picker');
var TextArea = require('../../components/textarea');
var _ = require('lodash');
var bookActions = require('../../../flux/actions/book.actions');


var BookCreate = React.createClass({

  handleValid(book) {

    if(this.refs.picture.validate() && this.refs.description.validate()) {
      book.description = this.refs.description.getValue();
      var file = this.refs.picture.getFile();

      file2base64(file)
        .then(base64 => {
          book.picture = base64;

          bookActions.createBook(book);
        })
        .catch(err => {
          toastr.error('Could not convert image');
        });
    }
  },

  handleInvalid() {
    this.refs.picture.validate();
    this.refs.description.validate();
  },

  render() {
    return (
      <Form onValidSubmit={this.handleValid} onInvalidSubmit={this.handleInvalid} enctype='multipart/form-data'>

        <legend>New Book</legend>

        <ValidatedInput
          type='text'
          name='title'
          placeholder='Title'
          validate='required'
        />

        <ValidatedInput
          type='text'
          name='author'
          placeholder='Author'
          validate='required'
        />

        <TextArea
          ref="description"
          placeholder="Description"
          required
        />

        <ValidatedInput
          type='number'
          name='year'
          placeholder='Year'
          validate={isNumber(0, new Date().getFullYear() + 1)}
        />

        <ValidatedInput
          type='number'
          name='pages'
          placeholder='Pages'
          validate={isNumber(0)}
        />

        <ValidatedInput
          type='number'
          name='count'
          placeholder='Count'
          validate={isNumber(0, 101)}
        />

        <ImagePicker ref='picture'/>

        <ButtonInput
          type='submit'
          bsSize='large'
          bsStyle='primary'
          value='Create'
          block
        />

      </Form>
    );
  }
});

module.exports = BookCreate;