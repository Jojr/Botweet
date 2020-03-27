import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { I18n } from '@aws-amplify/core';
import * as types from './types';
import * as typesAuth from '../auth/types';
import * as typesSystem from '../system/types';
import * as validation from '../../../utils/validation';

/* Create account on local device */
export const createAccount = (formData) => {
  return (dispatch) => {
    /* Validate all fields */
    if (!validation.StringNullOrEmptyValidation(formData)[0]) {
      const field = validation.StringNullOrEmptyValidation(formData)[1];
      console.log(field);
      Alert.alert(
        `${I18n.get('Oops!')}`,
        ` ${I18n.get('Field')} ${field} ${I18n.get('wrong or invalid')}.`,
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
      profileImage: 'https://reactnative.dev/img/tiny_logo.png',
    };
    dispatch({ type: typesSystem.SPINNER_STATUS, payload: true });

    /* Simulate api delay */
    setTimeout(() => {
      dispatch({ type: types.CREATE_ACCOUNT, payload: formSave });
      dispatch({ type: typesAuth.LOGIN, payload: formSave });
      // Redirect to authenticated flow
      Alert.alert(
        `${I18n.get('Bem vindo(a)')} ${formSave.name}!`,
        `${I18n.get('We apreciate your presence here')}.`,
        [
          { text: I18n.get('Continue'),
            onPress: () => {
              dispatch({ type: typesSystem.SPINNER_STATUS, payload: false });
              Actions.main();
            }
          },
        ],
      );
    }, 3000);
  };
};

export const purgeAccount = (accountData) => {
  return (dispatch) => {
    dispatch({ type: types.CREATE_ACCOUNT, payload: accountData });
  };
};
