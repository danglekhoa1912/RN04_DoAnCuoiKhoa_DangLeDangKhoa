export const REQUEST_LOGIN_USER_SUCCESS = 'REQUEST_LOGIN_USER_SUCCESS';
export const REQUEST_LOGIN_USER_FAIL = 'REQUEST_LOGIN_USER_FAIL';
export const REQUEST_PROFILED_USER_SUCCESS = 'REQUEST_PROFILED_USER_SUCCESS';
export const REQUEST_PROFILED_USER_FAIL = 'REQUEST_PROFILED_USER_FAIL';

export const requestLoginUserSuccess = payload => ({
  type: REQUEST_LOGIN_USER_SUCCESS,
  payload,
});

export const requestLoginUserFail = payload => ({
  type: REQUEST_LOGIN_USER_FAIL,
  payload,
});

export const requestProfiledUserSuccess = payload => ({
  type: REQUEST_PROFILED_USER_SUCCESS,
  payload,
});

export const requestProfiledUserFail = payload => ({
  type: REQUEST_PROFILED_USER_FAIL,
  payload,
});
