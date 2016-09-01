import React from 'react';
import {connect} from 'react-redux';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import Paper from 'material-ui/Paper'

import MentionEditor from './mentionEditor'

var Mentions = React.createClass({
  getInitialState: function () {
    return ({
      dialogOpen: false,
      focus: ""
    })
  },

  cellClick(rowNumber, columnID) {
    var item = this.props.mentions[rowNumber];
    window.localStorage.setItem(item.id, "read");
    this.setState({
      dialogOpen: true,
      focus: rowNumber
    })
  },

  handleClose() {
    this.setState({
      dialogOpen: false,
      focus: ""
    })
  },

  render() {
    var that = this;
    const dialogActions = [
      <FlatButton
            label="Cancel"
            primary={true}
            onTouchTap={this.handleClose}
          />
    ]

    return (
      <div>
        <Table onCellClick={that.cellClick}>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>Status</TableHeaderColumn>
              <TableHeaderColumn>Type</TableHeaderColumn>
              <TableHeaderColumn>Board/Card</TableHeaderColumn>
              <TableHeaderColumn>Comment Text</TableHeaderColumn>
              <TableHeaderColumn>Date</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {
              this.props.mentions.map(function (mention, index) {
                var date = new Date(mention.date)
                return (
                  <TableRow key={index} >
                    <TableHeaderColumn>{mention.readStatus}</TableHeaderColumn>
                    <TableRowColumn>{mention.type}</TableRowColumn>
                    <TableRowColumn>{mention.data.board.name + " / " + mention.data.card.name}</TableRowColumn>
                    <TableRowColumn>{mention.data.text}</TableRowColumn>
                    <TableRowColumn>{`${date.getMonth()}/${date.getDate()}`}</TableRowColumn>
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
        <Dialog
          title="Respond"
          actions={dialogActions}
          open={this.state.dialogOpen}
          contentStyle={{width: '85%', maxWidth: 'none'}}>
          <MentionEditor rowID={this.state.focus} />
        </Dialog>
      </div>
    )
  }
})

const mapStateToProps = function (state, ownProps) {
  return {
    mentions: state.mentions
  }
}

const mapDispatchToProps = function (dispatch) {
  return {
    authorize: (event) => {
      dispatch(authorize())
    },
    getItems: (event) => {
      dispatch(getItems());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Mentions);
