import * as types from '../../actions/Account/types';

const initialState = {
  accountList: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.PURGE: {
      console.log('PURGING STORE!!!!');
      return { ...initialState };
    }
    /* Add account to list for fake request purposes */
    case types.CREATE_ACCOUNT: {
      console.log('Add account');
      return {
        ...state,
        accountList: [...state.accountList, action.payload],
      };
    }
    default:
      return state;
  }
};
