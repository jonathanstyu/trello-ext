import {createStore, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

var trelloApp = function (state, action) {
  if (typeof state === 'undefined') {
    return {
      authorized: false,
      mentions: [],
      downloaded: false
    }
  }
  switch (action.type) {
    case "START_AUTH":
      break;
    case "AUTH_RESPONSE":
      return Object.assign({}, state, {
        authorized: action.authorized
      })
    case "ITEM_RESPONSE":
      if (action.response) {
        return Object.assign({}, state, {
          downloaded: true,
          mentions: action.data
        })
      } else {
        return state;
      }
    default:

  }
  return state;
}
var logger = createLogger();

var store = createStore(trelloApp, applyMiddleware(thunkMiddleware, logger));
export default store;
