import * as types from '../../actions/auth/types';

const initialState = {
  isAuthenticated: false,
  userData: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.PERSIST_REHYDRATE: {
      return { ...state };
    }
    case types.PURGE: {
      console.log('PURGING STORE!!!!');
      return { ...initialState };
    }
    case types.LOGIN: {
      console.log('Login complete');
      return {
        ...state,
        isAuthenticated: true,
        userData: action.payload,
      };
    }
    default:
      return state;
  }
};
