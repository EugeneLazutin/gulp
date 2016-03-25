var React = require('react');
var ClassNames = require('classnames');
var { isSingleImage } = require('../../services/validation');

module.exports = React.createClass({
  getInitialState() {
    return {
      name: '',
      file: null,
      error: '',
      hasError: false
    };
  },

  validate() {
    if(this.state.file === null) {
      if (!this.state.hasError) {
        this.setState({
          hasError: true
        });
      }
      return false;
    }
    return true;
  },

  getFile() {
    return this.state.file;
  },

  _handleChange(evt) {
    var validationResult = isSingleImage(evt.target.files);

    if(validationResult === true) {
      var file = evt.target.files[0];
      this.setState({
        file: file,
        name: file.name,
        hasError: false,
        error: ''
      });
    } else {
      this.setState({
        file: null,
        name: '',
        hasError: true,
        error: validationResult
      });
    }
  },

  _renderError() {
    if (this.state.hasError) {
      return <span className="help-block">{this.state.error}</span>;
    }
  },

  _formClass() {
    return ClassNames({
      'form-group': true,
      'has-error': this.state.hasError
    });
  },

  render() {
    return (
      <div className={this._formClass()}>
        <div className='input-group img-picker'>
          <label className='btn input-group-addon' htmlFor='picture'>
            Pick picture <input type='file' name='picture' id='picture' className='hidden' accept='image/*'
                                onChange={this._handleChange}/>
          </label>
          <input type='text' className='form-control' value={this.state.name} readOnly/>
        </div>
        {this._renderError()}
      </div>
    );
  }
});