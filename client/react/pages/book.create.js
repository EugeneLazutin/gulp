var React = require('react');
var { ButtonInput } = require('react-bootstrap');
var { Form, ValidatedInput } = require('react-bootstrap-validation');
var services = require('../../services');
var ImagePicker = require('../components/image_picker');
var _ = require('lodash');

var create = services.book.create;
var isNumber = services.validation.isNumber;

module.exports = React.createClass({

  handleValid(book) {

    if(this.haveImage()) {
      this.refs.picture.getBase64()
        .then(base64 => {
          book.picture = base64;

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
        });
    }
  },

  haveImage() {
    var picture = this.refs.picture;

    if (!picture.state.file) {
      picture.setState({
        hasError: true,
        error: 'picture required'
      });
    }

    return !!picture.state.file;
  },

  render() {
    return (
      <Form onValidSubmit={this.handleValid} onInvalidSubmit={this.haveImage} enctype='multipart/form-data'>

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
