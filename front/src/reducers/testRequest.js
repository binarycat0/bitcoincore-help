import {TEST_REQUEST_ERROR, TEST_REQUEST_REQUEST, TEST_REQUEST_SUCCESS} from "../constants/actionTypes";

export const initialState = {
  result: "",
  error: null,
  isFetching: null
};

export function testRequestReducer(state = initialState, action) {
  switch (action.type) {
    case TEST_REQUEST_REQUEST:
      return {...state, isFetching: true, error: null};
    case TEST_REQUEST_SUCCESS:
      return {...state, isFetching: false, error: null, ...action.payload};
    case TEST_REQUEST_ERROR:
      return {...state, isFetching: false, error: action.payload};
    default:
      return state;
  }
}