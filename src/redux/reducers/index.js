import { combineReducers } from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import { persistReducer } from 'redux-persist';
/* Reducers */
import auth from './auth';
import account from './account';
import posts from './posts';

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  blacklist: ['loading', 'loaded'],
};

const accountsPersist = {
  key: 'account',
  storage: AsyncStorage,
  blacklist: ['loading', 'loaded'],
};

const postPersist = {
  key: 'posts',
  storage: AsyncStorage,
  blacklist: ['loading', 'loaded'],
};

export default combineReducers({
  auth: persistReducer(authPersistConfig, auth),
  account: persistReducer(accountsPersist, account),
  // posts: persistReducer(postPersist, posts),
  posts,
});
