import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import './assets/styles.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';

const container = document.getElementById('root');
const root = createRoot(container); // Create a root

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);