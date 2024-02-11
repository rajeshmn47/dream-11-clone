import axios from "axios";

import {
  MATCH_FAIL,
  MATCH_LIVE_SUCCESS,
  MATCH_REQUEST,
  MATCH_SUCCESS,
} from "../constants/matchConstants";
import { URL } from "../constants/userConstants";

const headers = {
  Accept: "application/json",
};

export const getmatch = (id) => async (dispatch) => {
  try {
    const data = await axios.get(`${URL}/getcontests/${id}`);
    const matchdata = await axios.get(`${URL}/getmatch/${id}`);
    const matchlivedata = await axios.get(`${URL}/getmatchlive/${id}`);
    dispatch({ type: MATCH_SUCCESS, payload: matchdata.data.match });
    dispatch({ type: MATCH_LIVE_SUCCESS, payload: matchlivedata.data.match });
  } catch (error) {
    console.log(error);
  }
};
