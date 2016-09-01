import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';

import {authorize, getItems, getBoards} from '../actions/trelloAppActions';
import {connect} from 'react-redux';

var NavBar = React.createClass({
  handleTouchTap: function() {
    if (this.props.authorized) {
      this.props.get()
    } else {
      this.props.authorize()
    }
  },

  render() {
    return (
      <AppBar
        title={"Trello Extended"}
        iconElementRight={
          <FlatButton label={this.props.authorized ? "Get" : "Authorize"} onClick={this.handleTouchTap} />
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
    },
    get: (event) => {
      if (ownProps.openTab === "Mentions") {
        dispatch(getItems());
      } else {
        dispatch(getBoards());
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
