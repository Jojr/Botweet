import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { I18n } from '@aws-amplify/core';
import * as types from './types';
import * as typesAuth from '../auth/types';
import * as validation from '../../../utils/validation';

/* Create account on local device */
export const createAccount = (formData) => {
  return (dispatch) => {
    /* Validate all fields */
    if (!validation.StringNullOrEmptyValidation(formData)[0]) {
      const field = validation.StringNullOrEmptyValidation(formData)[1];
      Alert.alert(
        `${I18n.get('Oops!')}`,
        ` ${I18n.get('Field')} ${field} ${I18n.get('wrong or invalid')}.`,
        I18n.get('Check if the field and try again.'),
        [
          { text: 'Ok' },
        ],
      );
      return false;
    }
    /* Generate userId */
    const formSave = {
      ...formData,
      userId: validation.idGenerator(),
      profileImage: 'https://api.adorable.io/avatars/mouth/mouth6',
    };
    dispatch({ type: types.CREATE_ACCOUNT, payload: formSave });
    dispatch({ type: typesAuth.LOGIN, payload: formSave });
    /* Redirect to authenticated flow */
    Actions.main();
  };
};

export const purgeAccount = (accountData) => {
  return (dispatch) => {
    dispatch({ type: types.CREATE_ACCOUNT, payload: accountData });
  };
};
