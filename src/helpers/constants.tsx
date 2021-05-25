declare global {
    interface Window {
        _env_: any;
    }
  }

export const AUTHAPI_URL = 'http://localhost/AuthAPI/';
export const urlAPI = window._env_.URLAPI;
//export const urlAPI = 'http://localhost:39748/';

export default null;