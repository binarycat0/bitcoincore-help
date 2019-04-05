import {CHECK_HELP_ERROR, CHECK_HELP_REQUEST, CHECK_HELP_SUCCESS} from "../constants/actionTypes";

export const initialState = {
  blocks: [],
  isFetching: null,
  error: null,
};

export function helpReducer(state = initialState, action) {
  switch (action.type) {
    case CHECK_HELP_REQUEST:
      return {...state, isFetching: true, error: null,};
    case CHECK_HELP_SUCCESS:
      return {...state, isFetching: false, error: null, ...action.payload};
    case CHECK_HELP_ERROR:
      return {...state, isFetching: false, error: action.payload};
    default:
      return state;
  }
}