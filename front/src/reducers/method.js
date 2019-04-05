import {METHOD_HELP_ERROR, METHOD_HELP_REQUEST, METHOD_HELP_SUCCESS} from "../constants/actionTypes";

export const initialState = {
  name: "",
  description: "",
  result: "",
  error: null,
  isFetching: null
};

export function methodReducer(state = initialState, action) {
  switch (action.type) {
    case METHOD_HELP_REQUEST:
      return {...state, isFetching: true, error: null};
    case METHOD_HELP_SUCCESS:
      return {...state, isFetching: false, error: null, ...action.payload};
    case METHOD_HELP_ERROR:
      return {...state, isFetching: false, error: action.payload};
    default:
      return state;
  }
}