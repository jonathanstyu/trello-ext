import React from 'react';
import {connect} from 'react-redux';

import SearchResults from './searchResults';

import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';

import {executeSearchQuery} from '../actions-reducers/trelloAppActions';

var Search = React.createClass({
  getInitialState() {
    return {
      textContent: ""
    }
  },

  keyDown(event) {
    if (event.keyCode === 13) {
      this.props.submit(event);
      event.target.value = ""
    }
  },

  onChange(event) {
    event.stopPropagation();
  },

  render() {
    return (
      <div>
        <TextField onChange={this.onChange}
          fullWidth={true}
          onKeyDown={this.keyDown}
          hintText={this.props.authorized ? "Search for something here" : "Authorize to do a search?"}
          id="searchBar" />
        <div style={styles.wrapper}>
          <p>Previous Queries</p>
          {
            this.props.pastQueries.map(function (query) {
              return (
                <Chip style={styles.chip} key={query}>{query}</Chip>
              )
            })
          }
        </div>
        <Divider />
        <p>Results</p>
        <SearchResults />
      </div>
    )
  }
})

const styles = {
  chip: {
    margin: 4
  },
  wrapper: {
    display: "flex",
    flexWrap: 'wrap'
  }
}

const mapStateToProps = function (state, ownProps) {
  return {
    pastQueries: state.queries.toArray(),
    authorized: state.authorized
  }
}

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    submit: (event) => {
      if (Trello.authorized()) {
        dispatch(executeSearchQuery(event.target.value))
      } else {
        dispatch({type: "UNAUTHORIZED_SEARCH"})
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
