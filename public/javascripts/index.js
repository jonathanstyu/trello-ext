import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import App from './app.jsx';
import store from './actions/trelloApp';
import {Provider} from 'react-redux';
// for Material UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();
ReactDOM.render((
  <MuiThemeProvider>
    <Provider store={store}>
      <App/>
    </Provider>
  </MuiThemeProvider>
), document.getElementById('content'));
