var React = require('react');
var { ButtonInput } = require('react-bootstrap');
var { Form, ValidatedInput } = require('react-bootstrap-validation');
var services = require('../../../services/index');
var ImagePicker = require('../../components/image_picker');
var TextArea = require('../../components/textarea');
var _ = require('lodash');

var create = services.book.create;
var { isNumber } = services.validation;
var { file2base64 } = services.image;

module.exports = React.createClass({

  handleValid(book) {

    if(this.refs.picture.validate() && this.refs.description.validate()) {
      book.description = this.refs.description.getValue();
      var file = this.refs.picture.getFile();

      file2base64(file)
        .then(base64 => {
          book.picture = base64;

          create(book)
            .then(createdBook => {
              toastr.success('Book created');
            })
            .catch(err => {
              console.log(err);
              toastr.error('Could not create new book');
            });
        })
        .catch(err => {
          console.log(err);
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
