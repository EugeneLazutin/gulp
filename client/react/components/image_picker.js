var React = require('react');
var ClassNames = require('classnames');
var { file2base64 } = require('../../services/image');

module.exports = React.createClass({
  getInitialState() {
    return {
      name: '',
      file: null,
      error: '',
      hasError: false
    };
  },

  getBase64() {
    return file2base64(this.state.file);
  },

  handleChange(evt) {
    var file = evt.target.files[0];

    if (file) {
      this.setState({
        file: file,
        name: file.name,
        hasError: false,
        error: ''
      });
    } else {
      this.setState({
        hasError: true,
        error: 'picture required'
      });
    }
  },

  renderError() {
    if (!this.state.valid) {
      return <span className="help-block">{this.state.error}</span>;
    }
  },

  formClass() {
    return ClassNames({
      'form-group': true,
      'has-error': this.state.hasError
    });
  },

  render() {
    return (
      <div className={this.formClass()}>
        <div className='input-group img-picker'>
          <label className='btn input-group-addon' htmlFor='picture'>
            Pick picture <input type='file' name='picture' id='picture' className='hidden' accept='images/*'
                                onChange={this.handleChange}/>
          </label>
          <input type='text' className='form-control' value={this.state.name} readOnly/>
        </div>
        {this.renderError()}
      </div>
    );
  }
});