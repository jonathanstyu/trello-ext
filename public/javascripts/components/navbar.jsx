import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';

import {authorize} from '../actions-reducers/trelloAppActions';
import {connect} from 'react-redux';

var NavBar = React.createClass({
  render() {
    return (
      <AppBar
        title={"Trello Extended"}
        iconElementRight={
          <FlatButton disabled={this.props.authorized} label={this.props.authorized ? "Authorized" : "Authorize"} onClick={this.props.authorize} />
        }
        />
    )
  }
})

const mapStateToProps = function (state, ownProps) {
  return {
    authorized: state.authorized,
    openTab: state.openTab
  }
}

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    authorize: (event) => {
      dispatch(authorize())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
