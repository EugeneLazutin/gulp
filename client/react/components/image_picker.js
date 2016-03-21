var React = require('react');
var classnames = require('classnames');

module.exports = React.createClass({
  getInitialState() {
    return {
      name: '',
      file: null,
      error: ''
    };
  },

  handleChange(evt) {
    var file = evt.target.files[0];

    if (file) {
      this.setState({
        name: evt.target.files[0].name,
        file: file,
        error: ''
      });
    }
  },

  setError(err) {
    this.setState({
      error: err
    });
  },

  resetError() {
    this.setState({
      error: ''
    });
  },

  render() {

    var formClass = classnames({
      'form-group': true,
      'has-error': this.state.error
    });

    var error = this.state.error ? <span className="help-block">{this.state.error}</span> : null;

    return (
      <div className={formClass}>
        <div className='input-group img-picker'>
          <label className='btn input-group-addon' htmlFor='picture'>
            Pick picture <input type='file' name='picture' id='picture' className='hidden' accept='images/*'
                                onChange={this.handleChange}/>
          </label>
          <input type='text' className='form-control' value={this.state.name} readOnly/>
        </div>
        {error}
      </div>
    );
  }
});