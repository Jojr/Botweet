import { combineReducers } from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import { persistReducer } from 'redux-persist';
/* Reducers */
import auth from './auth';

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  blacklist: ['loading', 'loaded'],
};

export default combineReducers({
  auth: persistReducer(authPersistConfig, auth),
});
