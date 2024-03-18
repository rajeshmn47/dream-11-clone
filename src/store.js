import { configureStore } from '@reduxjs/toolkit';
import { positions, Provider as AlertProvider, transitions } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { matchReducer } from './reducers/matchReducer';
import { userReducer } from './reducers/userReducer';

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
};

const reducer = combineReducers({
  user: userReducer,
  match: matchReducer,
});

const middleware = [thunk];

const store = configureStore({
  reducer,
  middleware,
});

export default store;
