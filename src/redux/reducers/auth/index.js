import * as types from '../../actions/auth/types';

const initialState = {
  isAuthenticated: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.PERSIST_REHYDRATE: {
      return { ...state, ...initialState };
    }
    case types.PURGE: {
      console.log('PURGING STORE!!!!');
      return { ...initialState };
    }
    default:
      return state;
  }
};
