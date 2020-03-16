/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import logger from 'redux-logger';
import AsyncStorage from '@react-native-community/async-storage';
import reducers from '../redux/reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
  blacklist: [],
  timeout: null,
};

let middleware = [];
if (__DEV__) {
  middleware = [...middleware, thunk, logger];
} else {
  middleware = [...middleware, thunk];
}

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(persistedReducer, {}, applyMiddleware(...middleware));

const persistor = persistStore(store);
console.log('store criado:', store.getState().check);

export { store, persistor };
