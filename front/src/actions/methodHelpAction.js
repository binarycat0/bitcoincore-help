import {METHOD_HELP_ERROR, METHOD_HELP_REQUEST, METHOD_HELP_SUCCESS} from "../constants/actionTypes";
import {API_HELP_URL} from "../constants/api";


export function getMethodHelp(method_name) {
  return dispatch => {

    dispatch({
      type: METHOD_HELP_REQUEST,
      payload: null
    });

    let url = API_HELP_URL + '' + method_name;

    fetch(url, {method: 'GET', mode: 'cors'})
      .then(response => response.json())
      .then(json => {

        if (json.status === 'ok') {
          dispatch({
            type: METHOD_HELP_SUCCESS,
            payload: {name: method_name, result: json.result.replace(/\n/gm, '<br>').replace(/\n\n/gm, '<p/>')},
          })
        } else {
          throw Error(json.message)
        }
      })
      .catch(error => {
        let message = error.message;
        if (message) {
          message = message.toLowerCase().includes('failed to fetch') ? 'Middle server unavailable' : message;
        }

        dispatch({
          type: METHOD_HELP_ERROR,
          payload: message,
        });
      })
  }
}