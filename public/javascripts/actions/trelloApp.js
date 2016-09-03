import {createStore, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import Immutable from 'immutable';
import thunkMiddleware from 'redux-thunk';

var trelloApp = function (state, action) {
  if (typeof state === 'undefined') {
    return {
      snackOpen: false,
      snackMessage: "",
      authorized: false,
      mentions: [],
      mentionsDownloaded: false,
      openTab: 'Mentions',
      queries: Immutable.List(),
      currentQueryResults: "",
      loading: false
    }
  }
  switch (action.type) {
    case "START_AUTH":
      break;
    case "AUTH_RESPONSE":
      return Object.assign({}, state, {
        authorized: action.authorized,
        snackMessage: "Trello Authorized",
        snackOpen: true
      })
    case "ITEM_RESPONSE":
      if (action.response) {
        return Object.assign({}, state, {
          mentionsDownloaded: true,
          mentions: action.data,
          snackMessage: "Data Received",
          snackOpen: true
        })
      } else {
        return state;
      }

    case "CLOSE_SNACKBAR":
      return Object.assign({}, state, {
        snackOpen: false
      });
    case "SWITCH_TABS":
      return Object.assign({}, state, {
        openTab: state.openTab === "Mentions" ? "Search" : "Mentions"
      })
    case "SEARCH_QUERY":
      return Object.assign({}, state, {
        queries: state.queries.push(action.value),
        loading: true
      })

    case "UNAUTHORIZED_SEARCH":
      return Object.assign({}, state, {
        snackMessage: "Please authorize before searching",
        snackOpen: true
      })
    case 'QUERY_RESPONSE':
      if (action.success) {
        return Object.assign({}, state, {
          currentQueryResults: action.data.cards,
          loading: false
        })
      }
    default:

  }
  return state;
}
var logger = createLogger();

var store = createStore(trelloApp, applyMiddleware(thunkMiddleware, logger));
export default store;
