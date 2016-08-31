import {createStore} from 'redux';

var trelloApp = function (state, action) {
  if (typeof state === 'undefined') {
    return {
      authorized: false
    }
  }
  return state; 
}

var store = createStore(trelloApp);
export default store;
