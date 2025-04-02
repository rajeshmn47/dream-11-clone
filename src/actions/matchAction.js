import {
  MATCH_LIVE_SUCCESS,
  MATCH_SUCCESS,
  MATCH_REQUEST
} from '../constants/matchConstants';
import { URL } from '../constants/userConstants';
import { API } from './userAction';

const headers = {
  Accept: 'application/json',
};

export const getmatch = (id) => async (dispatch) => {
  try {
    dispatch({ type: MATCH_REQUEST });
    const matchdata = await API.get(`${URL}/getmatch/${id}`);
    const matchlivedata = await API.get(`${URL}/getmatchlive/${id}`);
    dispatch({ type: MATCH_SUCCESS, payload: matchdata.data.match });
    dispatch({ type: MATCH_LIVE_SUCCESS, payload: matchlivedata.data.match });
  } catch (error) {
    console.log(error);
  }
};
