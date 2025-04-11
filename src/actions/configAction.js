import {
    CONFIG_REQUEST,
    CONFIG_SUCCESS,
    CONFIG_FAIL,
    CONFIG_CLEAR_ERRORS,
  } from '../constants/configConstants';
  import { API } from './userAction';
  import { URL } from '../constants/userConstants';
  
  const headers = {
    Accept: 'application/json',
  };
  
  // Get config (assumes config has a name like "global")
  export const getConfig = (name = "global") => async (dispatch) => {
    try {
      dispatch({ type: CONFIG_REQUEST });
  
      const { data } = await API.get(`${URL}/api/config`, { headers });
  
      dispatch({ type: CONFIG_SUCCESS, payload: data.configs });
    } catch (error) {
      dispatch({
        type: CONFIG_FAIL,
        payload: error.response?.data?.error || error.message,
      });
    }
  };
  
  // Update config (only admin can do this)
  export const updateConfig = (name, tier) => async (dispatch) => {
    try {
      dispatch({ type: CONFIG_REQUEST });
  
      const { data } = await API.post(
        `${URL}/config`,
        { name, tier },
        { headers: { ...headers, 'Content-Type': 'application/json' } }
      );
  
      dispatch({ type: CONFIG_SUCCESS, payload: data.config });
    } catch (error) {
      dispatch({
        type: CONFIG_FAIL,
        payload: error.response?.data?.error || error.message,
      });
    }
  };
  
  // Clear errors
  export const clearConfigErrors = () => (dispatch) => {
    dispatch({ type: CONFIG_CLEAR_ERRORS });
  };
  