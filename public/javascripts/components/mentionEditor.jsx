import React from 'react';
import TextField from 'material-ui/TextField';

import {authorize, getItems} from '../actions/trelloAppActions';
import {connect} from 'react-redux';

var MentionEditor = React.createClass({
  handleTouchTap: function() {
    if (this.props.authorized) {
      this.props.getItems()
    } else {
      this.props.authorize()
    }
  },

  render() {
    var showContent;
    var mention = this.props.mention;
    if (mention !== "") {
      showContent = (
        <div>
          <p><b>Text:</b> {mention.data.text || ""}</p>
          <p><b>Board:</b> {mention.data.board.name}</p>
          <p><b>Card:</b> {mention.data.card.name}</p>
        </div>
      )
    }
    return (
      <div>
        {showContent}
        <br />
        <TextField fullWidth={true} hintText="Write something" onSubmit={this.props.submit} />
      </div>
    )
  }
})

const mapStateToProps = function (state, ownProps) {
  if (ownProps.rowID) {
    return {
      mention: state.mentions[ownProps.rowID]
    }
  } else {
    return {
      mention: ""
    }
  }
}

const mapDispatchToProps = function (dispatch) {
  return {
    submit: (event) => {
      console.log(event.target.value);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MentionEditor);
