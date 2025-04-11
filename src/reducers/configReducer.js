import {
    CONFIG_REQUEST,
    CONFIG_SUCCESS,
    CONFIG_FAIL,
    CONFIG_CLEAR_ERRORS,
  } from "../constants/configConstants";
  
  export const configReducer = (state = { config: {} }, action) => {
    switch (action.type) {
      case CONFIG_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case CONFIG_SUCCESS:
        return {
          loading: false,
          config: action.payload,
        };
      case CONFIG_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case CONFIG_CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  