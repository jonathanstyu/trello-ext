import React from 'react';
import {connect} from 'react-redux';

import TextField from 'material-ui/TextField';

var Search = React.createClass({
  getInitialState() {
    return {
      textContent: ""
    }
  },

  keyDown(event) {
    if (event.keyCode === 13) {
      this.props.submit(event);
      this.setState({
        textContent: ""
      })
    }
  },

  onChange(event) {
    this.setState({
      textContent: event.target.value
    })
  },

  render() {
    return (
      <div>
        <TextField
          hintText="Search Cards"
          onChange={this.onChange}
          value={this.state.textContent}
          onKeyDown={this.keyDown}
          fullWidth={true}
            />
      </div>
    )
  }
})

const mapStateToProps = function (state, ownProps) {
  return {

  }
}

const mapDispatchToProps = function (dispatch, ownProps) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
