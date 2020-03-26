/* eslint-disable prefer-destructuring */
import { Alert } from 'react-native';
import moment from 'moment/min/moment-with-locales';
import * as types from './types';
import { Actions } from '_actions';
import { I18n } from '@aws-amplify/core';
import * as validation from '../../../utils/validation';

/* Save new post */
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
      date: moment().format('YYYY-MM-DD HH:mm:ss'),
    };
    dispatch({ type: types.ADD_POST, payload: newPost });
  };
};

/* Edit post */
export const editPost = (postContent, postId) => {
  return (dispatch, getState) => {
    const postData = getState().posts.postsList;
    const foundIndex = postData.findIndex((x) => x.id === postId);
    // console.log(postContent);
    // const vote = postData[foundIndex].upVotes + 1;
    dispatch({ type: types.EDIT_POST, payload: { foundIndex, postContent } });
  };
};

/* Detele post */
export const deletePost = (postId) => {
  return (dispatch, getState) => {
    const postData = getState().posts.postsList;
    const foundIndex = postData.findIndex((x) => x.id === postId);
    // console.log(foundIndex);
    // const vote = postData[foundIndex].upVotes + 1;
    dispatch({ type: types.DELETE_POST, payload: { foundIndex } });
  };
};

/* Up votes */
export const upVote = (postId) => {
  return (dispatch, getState) => {
    const postData = getState().posts.postsList;
    const foundIndex = postData.findIndex((x) => x.id === postId);
    const vote = postData[foundIndex].upVotes + 1;
    dispatch({ type: types.UPVOTE, payload: { foundIndex, vote } });
  };
};

/* Down votes */
export const downVote = (postId) => {
  return (dispatch, getState) => {
    const postData = getState().posts.postsList;
    const foundIndex = postData.findIndex((x) => x.id === postId);
    const vote = postData[foundIndex].downVotes + 1;
    dispatch({ type: types.DOWNVOTE, payload: { foundIndex, vote } });
  };
};

export const purgeAccount = (accountData) => {
  return (dispatch) => {
    dispatch({ type: types.CREATE_ACCOUNT, payload: accountData });
  };
};
