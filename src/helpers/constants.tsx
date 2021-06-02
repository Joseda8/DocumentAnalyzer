declare global {
    interface Window {
        _env_: any;
    }
  }

const apiHost = window._env_.DOCANALYZER_HOST;
const apiPort = window._env_.DOCANALYZER_PORT;


export const AUTHAPI_URL = 'http://localhost/AuthAPI/';
export const urlAPI = 'http://' + apiHost + ':' + apiPort + '/';
export const urlAPI = 'http://localhost:39748/';
export const WEB_SOCKET = 'ws://127.0.0.1:8765';
//export const urlAPI = 'http://localhost:39748/';
