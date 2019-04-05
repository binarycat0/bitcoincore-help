import {combineReducers} from "redux";
import {helpReducer} from "./help";
import {methodReducer} from "./method";
import {testRequestReducer} from "./testRequest";


export const rootReducer = combineReducers({
  help: helpReducer,
  method: methodReducer,
  test: testRequestReducer,
});
