import {
  CLEAR_ERRORS,
  MATCH_FAIL,
  MATCH_LIVE_SUCCESS,
  MATCH_REQUEST,
  MATCH_SUCCESS,
} from '../constants/matchConstants';

export const matchReducer = (state = { match: {} }, action) => {
  switch (action.type) {
    case MATCH_REQUEST:
      return {
        loading: true,
      };
    case MATCH_SUCCESS:
      return {
        ...state,
        loading: false,
        match_details: action.payload,
      };
    case MATCH_LIVE_SUCCESS:
      return {
        ...state,
        loading: false,
        matchlive: action.payload,
      };
    case MATCH_FAIL:
      return {
        ...state,
        loading: false,
        match_details: null,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
