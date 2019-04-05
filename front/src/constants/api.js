const API_PROTOCOL = process.env.REACT_APP_MIDDLE_PROTOCOL || 'http';
const API_HOST = process.env.REACT_APP_MIDDLE_HOST || '127.0.0.1';
const API_PORT = process.env.REACT_APP_MIDDLE_PORT || '8000';

const API_URL = API_PROTOCOL + '://' + API_HOST + ':' + API_PORT;

export const API_HELP_URL = API_URL + '/help/';
export const API_TEST_REQUEST_URL = API_URL + '/test_request/';