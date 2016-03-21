var React = require('react');
var { ButtonInput } = require('react-bootstrap');
var { Form, ValidatedInput } = require('react-bootstrap-validation');
var services = require('../../services');
var ImagePicker = require('../components/image_picker');

var create = services.book.create;
var file2base64 = services.image.file2base64;
var isNumber = services.validation.isNumber;

module.exports = React.createClass({

  handleValid(values) {

    var file = this.refs.picture.state.file;

    if(file) {
      file2base64(this.refs.picture.state.file)
        .then(base64 => {

          var book = Object.assign(values, {
            picture: base64
          });

          create(book)
            .then(createdBook => {
              toastr.success('book created');
            })
            .catch((err) => {
              console.log(err);
              toastr.error('could not create book');
            });
        })
        .catch(err => {
          console.log(err);
          toastr.error('could not convert image');
        })
    } else {
      this.refs.picture.setError('picture required');
    }
  },

  handleInvalid() {
    var picture = this.refs.picture;

    if(!picture.state.file) {
      picture.setError('picture required');
    }
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
          errorHelp={{
            required: 'Title required.'
          }}
        />

        <ValidatedInput
          type='text'
          name='author'
          placeholder='Author'
          validate='required'
          errorHelp={{
            required: 'Author required.'
          }}
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

        <ImagePicker ref='picture' />

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
