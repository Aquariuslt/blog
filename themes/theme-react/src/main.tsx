import './index.css';
import './offline';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from '@theme-react/App';

if (process.env.NODE_ENV === 'production') {
  ReactDOM.hydrate(<App />, document.getElementById('app'));
} else {
  ReactDOM.render(<App />, document.getElementById('app'));
}
