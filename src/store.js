import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { userReducer } from "./reducers/userReducer";

const reducer = combineReducers({
  user: userReducer,
});

const middleware = [thunk];

const store = configureStore({
  reducer,
  middleware,
});

export default store;
