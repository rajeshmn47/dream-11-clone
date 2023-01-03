import { userReducer } from "./reducers/userReducer";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { configureStore } from "@reduxjs/toolkit";

const reducer = combineReducers({
  user: userReducer,
});

const middleware = [thunk];

const store = configureStore({
  reducer,
  middleware,
});

export default store;
