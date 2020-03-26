import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { I18n } from '@aws-amplify/core';
import * as types from './types';
import * as typesAuth from '../auth/types';
import * as typesSystem from '../system/types';
import * as validation from '../../../utils/validation';

/* Fake Login with persisted data */
export const loginUser = (login) => {
  return (dispatch, getState) => {
    const { accountList } = getState().account;
    if (!validation.userVerify(login, accountList)[0]) {
      const field = validation.userVerify(login, accountList)[1];
      Alert.alert(
        `${I18n.get('Oops!')}`,
        ` ${I18n.get('Field')} ${field} ${I18n.get('wrong or invalid')}. \n ${I18n.get('(You already have an account?)')}`,
        [
          { text: I18n.get('Close'), style: 'cancel' },
          { text: I18n.get('Create new account'), onPress: () => Actions.createAccount() },
        ],
        { cancelable: true }
      );
      return false;
    }
    dispatch({ type: typesSystem.SPINNER_STATUS, payload: true });
    const userData = validation.userVerify(login, accountList)[1][0];
    // console.log(userData);
    /* Simulate api delay */
    setTimeout(() => {
      dispatch({ type: typesAuth.LOGIN, payload: userData });
      // Redirect to authenticated flow
      Actions.main();
      dispatch({ type: typesSystem.SPINNER_STATUS, payload: false });
    }, 2000);
  };
};

/* Login */
export const login = (formData) => {
  return (dispatch) => {
    dispatch({ type: types.LOGIN, payload: formData });
  };
};

export const purgeAccount = (accountData) => {
  return (dispatch) => {
    dispatch({ type: types.CREATE_ACCOUNT, payload: accountData });
  };
};
