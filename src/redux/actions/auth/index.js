import { Alert } from 'react-native';
import * as types from './types';
import * as typesAuth from '../auth/types';
import { Actions } from '_actions';
import { I18n } from '@aws-amplify/core';
import * as validation from '../../../utils/validation';

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
