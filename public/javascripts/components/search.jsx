import React from 'react';
import {connect} from 'react-redux';

var Search = React.createClass({
  render() {
    return (
      <div>
        <h2>We be searching</h2>
      </div>
    )
  }
})
const mapStateToProps = function (state, ownProps) {
  return {
    boards: state.boards
  }
}

const mapDispatchToProps = function (dispatch) {
  return {
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
