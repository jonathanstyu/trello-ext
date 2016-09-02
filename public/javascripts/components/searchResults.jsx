import React from 'react';
import {connect} from 'react-redux';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import _ from "lodash";

var SearchResults = React.createClass({
  render() {
    var that = this;
    var renderedColumns = [];

    // This nested function renders out the Board / List / Card vertical view
    _.forEach(this.props.results, function (lists, key) {
      // listOfCards holds the lists>cards within each board
      var listOfCards = [];

      // For each List, we push a header and search query card, [Header, queriedCard, queriedCard]
      _.forEach(lists, function (cards, key) {
        listOfCards.push((
          <Card key={key}>
            <CardHeader title={`List ${key}`} />
          </Card>
        ))
        listOfCards.push(cards.map(function (card) {
          return (
            <Card key={card.id}>
              <CardHeader title="Card"/>
              <CardText>{card.name}</CardText>
            </Card>
          )
        }))
      }) // closes lists.forEach function
      // We insert listOfCards into a prepared Board column Card stack
      var boardCol = (
        <Card key={key} style={styles.card}>
          <CardHeader title={`Board: ${key}`} />
          <Divider />
          {listOfCards}
        </Card>
      )
      // We finally create the full view by collecting the boards
      renderedColumns.push(boardCol)
    })
    return(
      <div style={styles.tearsheet} >
        {
          renderedColumns
        }
      </div>
    )
  }
})

const styles = {
  tearsheet: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  card: {
    flex: 1,
    margin: 5
  }
}

const mapStateToProps = function (state, ownProps) {
  var nestedCards = {};
  // The Trello API sends cards in an array, they are not grouped by board or list. we have to do that ourselves. We use Lodash's GroupBy function
  var nestedCards = _.groupBy(state.currentQueryResults, 'idBoard');
  _.forEach(nestedCards, function (value, key) {
    nestedCards[key] = _.groupBy(value, 'idList')
  })
  console.log(nestedCards);
  return {
    results: nestedCards
  }
}

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    submit: (event) => {
      dispatch(executeSearchQuery(event.target.value))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
