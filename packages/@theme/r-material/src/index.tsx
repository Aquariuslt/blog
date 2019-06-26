import './index.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { ThemeProvider } from '@material-ui/styles';
import { attachRoutes } from './router';

import './core';
import './post';

import theme from './theme';
import store from './store';

import App from './App';

// For easier debugging
window['_____APP_STATE_____'] = store;

ReactDOM.render(
  <Provider {...store}>
    <ThemeProvider theme={theme}>
      <App routes={attachRoutes()}/>
    </ThemeProvider>
  </Provider>,
  document.getElementById('app')
);
