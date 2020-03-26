import * as types from '../../actions/system/types';

const initialState = {
  spinnerStatus: false,
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
    case types.SPINNER_STATUS: {
      console.log(`Spinner set to ${action.payload}`);
      return {
        ...state,
        spinnerStatus: action.payload,
      };
    }
    default:
      return state;
  }
};
