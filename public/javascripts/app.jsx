import React from "react";
import {connect} from 'react-redux';

// Components
import NavBar from './components/navbar';
import Mentions from './components/mentions';
import Search from './components/search';
import Snackbar from 'material-ui/Snackbar';
import {Tabs, Tab} from 'material-ui/Tabs';

var App = React.createClass({
  render(){
    return (
      <div>
        <NavBar />
        <Tabs value={this.props.openTab} onChange={this.props.switchTabs}>
          <Tab label="Mentions" value="Mentions">
            <Mentions />
          </Tab>
          <Tab label="Search" value="Search">
            <Search />
          </Tab>
        </Tabs>
        <Snackbar
          open={this.props.snackOpen}
          message={this.props.snackMessage}
          autoHideDuration={4000}
          onRequestClose={this.props.closeSnack}
          />
      </div>
    )
  }
})

const mapStateToProps = function (state) {
  return {
    snackOpen: state.snackOpen,
    snackMessage: state.snackMessage,
    openTab: state.openTab
  }
}

const mapDispatchToProps = function (dispatch) {
  return {
    closeSnack: (event) => {
      dispatch({type: "CLOSE_SNACKBAR"})
    },
    switchTabs: (event) => {
      dispatch({type: "SWITCH_TABS"})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
