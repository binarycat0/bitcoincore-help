import {CHECK_HELP_ERROR, CHECK_HELP_REQUEST, CHECK_HELP_SUCCESS} from "../constants/actionTypes";
import {API_HELP_URL} from "../constants/api";

function parseHelpResult(result) {

  let blocks = result.match(/^==\s\w+\s==$/gm);
  let block_methods = result.split(/^==\s\w+\s==$/gm).filter(e => !!e);

  if (!!blocks) {
    return blocks.map((block, i) => {
      return {
        name: block.match(/\w+/)[0],
        methods: block_methods[i].split(/\n/gm).filter(e => !!e).map(method => {
          let name_desc = method.split(' ');
          return {name: name_desc[0], description: name_desc.length > 1 ? name_desc[1] : ''};
        })
      }
    })
  }

  return []
}

export function checkHelp() {
  return dispatch => {

    dispatch({
      type: CHECK_HELP_REQUEST,
      payload: null
    });

    fetch(API_HELP_URL, {method: 'GET', mode: 'cors'})
      .then(response => response.json())
      .then(json => {

        if (json.status === 'ok') {
          dispatch({
            type: CHECK_HELP_SUCCESS,
            payload: {blocks: parseHelpResult(json.result)},
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
          type: CHECK_HELP_ERROR,
          payload: message,
        })
      })
  }
}