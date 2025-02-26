import './index.css';

import React from 'react';
import { positions, Provider as AlertProvider, transitions } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';
import zIndex from '@mui/material/styles/zIndex';

const options = {
  timeout: 5000,
  position: positions.MIDDLE_LEFT,
  transition: transitions.SCALE,
  zIndex: 10000
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options} >
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </AlertProvider>
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
