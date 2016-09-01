import React from 'react';
import TextField from 'material-ui/TextField';

import {addComment} from '../actions/trelloAppActions';
import {connect} from 'react-redux';

var MentionEditor = React.createClass({
  getInitialState() {
    return {
      textContent: ""
    }
  },

  keyDown(event) {
    if (event.keyCode === 13) {
      var cardToPost = this.props.mention.data.card.id;
      this.props.submit(event, cardToPost);
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
    var showContent;
    var mention = this.props.mention;
    if (mention !== "") {
      showContent = (
        <div>
          <p><b>Board:</b> {mention.data.board.name} || <b>Card:</b> {mention.data.card.name}</p>
          <p><b>Comment/Event</b> {mention.data.text || mention.type}</p>
          <p><b>Author:</b> {mention.memberCreator.fullName} ({mention.memberCreator.username})</p>
        </div>
      )
    }
    return (
      <div>
        {showContent}
        <br />
        <TextField fullWidth={true}
          hintText="Write something"
          value={this.state.textContent}
          onKeyDown={this.keyDown}
          onChange={this.onChange} />
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

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    submit: (event, cardID) => {
      dispatch(addComment(event.target.value, cardID))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MentionEditor);
