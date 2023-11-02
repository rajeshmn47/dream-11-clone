import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import {matchReducer} from './reducers/matchReducer';
import { userReducer } from './reducers/userReducer';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { combineReducers } from 'redux';
let reducers = combineReducers({ user:userReducer,match:matchReducer });
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    stateReconciler: autoMergeLevel2,
}

const initialState = {};

const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(persistedReducer, initialState, applyMiddleware(thunk));
const persistor = persistStore(store);

export { store, persistor };