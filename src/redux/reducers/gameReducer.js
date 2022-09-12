import { RESETTIME } from '../actions';

const INITIAL_STATE = {
  resetTime: false,
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RESETTIME:
    return {
      ...state,
      resetTime: action.payload,
    };
  default: return state;
  }
};

export default gameReducer;
