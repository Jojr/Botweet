/* eslint-disable prefer-destructuring */
import { Alert } from 'react-native';
import moment from 'moment/min/moment-with-locales';
import * as types from './types';
import { Actions } from '_actions';
import { I18n } from '@aws-amplify/core';
import * as validation from '../../../utils/validation';

/* Login */
export const savePost = (payload) => {
  return (dispatch, getState) => {
    const userData = getState().auth.userData;
    const newPost = {
      id: validation.idGenerator(),
      profileImage: userData.profileImage,
      name: userData.name,
      isEdited: false,
      postContent: payload,
      upVotes: 0,
      downVotes: 0,
      isOwner: true,
      ownerID: userData.email,
      date: moment().format('YYYY-MM-DD HH:mm'),
    };
    dispatch({ type: types.ADD_POST, payload: newPost });
  };
};

export const purgeAccount = (accountData) => {
  return (dispatch) => {
    dispatch({ type: types.CREATE_ACCOUNT, payload: accountData });
  };
};
