import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ContextProvider } from './context';
import store from './store';

ReactDOM.render(
  <ContextProvider value={store}>
    <App />
    </ContextProvider>,
  document.getElementById('root')
);