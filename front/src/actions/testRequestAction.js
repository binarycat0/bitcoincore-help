import {TEST_REQUEST_ERROR, TEST_REQUEST_REQUEST, TEST_REQUEST_SUCCESS} from "../constants/actionTypes";
import {API_TEST_REQUEST_URL} from "../constants/api";

function testResult(result) {
  return JSON.stringify(result, undefined, 2).replace(/\\n+/gm, '<br>')
}

export function testRequest(params) {
  return (dispatch, getState) => {
    dispatch({
      type: TEST_REQUEST_REQUEST,
      payload: null
    });

    let _params = "";
    try {
      _params = JSON.parse("[" + params + "]");
    } catch (error) {
      dispatch({
        type: TEST_REQUEST_ERROR,
        payload: error.message,
      });

      return;
    }

    let headers = new Headers({"Content-Type": "application/json",});
    let req_init = {
      method: 'POST',
      mode: 'cors',
      headers: headers,
      body: JSON.stringify({method: getState().method.name, params: _params})
    };

    fetch(API_TEST_REQUEST_URL, req_init)
      .then(response => response.json())
      .then(json => {
        if (json.status === 'ok') {
          dispatch({
            type: TEST_REQUEST_SUCCESS,
            payload: {result: testResult(json.result)},
          })
        } else {
          dispatch({
            type: TEST_REQUEST_ERROR,
            payload: json.message,
          })
        }
      })
      .catch(error => {
        let message = error.message;
        if (message) {
          message = message.toLowerCase().includes('failed to fetch') ? 'Middle server unavailable' : message;
        }

        dispatch({
          type: TEST_REQUEST_ERROR,
          payload: message,
        });
      })
  }
}