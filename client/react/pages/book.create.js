var React = require('react');
var { ButtonInput } = require('react-bootstrap');
var { Form, ValidatedInput } = require('react-bootstrap-validation');
var { browserHistory } = require('react-router');
var agent = require('superagent');
var cookie = require('react-cookie');

module.exports = React.createClass({

  handleValid(values) {
    agent
      .post('/api/book')
      .send(values)
      .end((err, res) => {
        console.log(err || res);
      });
  },

  render() {
    return (
      <Form onValidSubmit={this.handleValid}>

        <legend>New Book</legend>

        <ValidatedInput
          type='text'
          name='title'
          placeholder='Title'
          validate='required'
          value='title'
        />

        <ValidatedInput
          type='text'
          name='picture'
          placeholder='Picture'
          validate='required'
          value='picture'
        />

        <ValidatedInput
          type='text'
          name='author'
          placeholder='Author'
          validate='required'
          value='author'
        />

        <ValidatedInput
          type='text'
          name='year'
          placeholder='Year'
          validate='required'
          value='2000'
        />

        <ValidatedInput
          type='text'
          name='pages'
          placeholder='Pages'
          validate='required'
          value='200'
        />

        <ValidatedInput
          type='text'
          name='count'
          placeholder='Count'
          validate='required'
          value='3'
        />

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
