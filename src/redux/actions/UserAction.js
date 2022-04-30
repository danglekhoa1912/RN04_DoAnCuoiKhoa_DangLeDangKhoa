export const REQUEST_LOGIN_USER_SUCCESS = 'REQUEST_LOGIN_USER_SUCCESS';
export const REQUEST_LOGIN_USER_FAIL = 'REQUEST_LOGIN_USER_FAIL';
export const REQUEST_PROFILED_USER_SUCCESS = 'REQUEST_PROFILED_USER_SUCCESS';
export const REQUEST_PROFILED_USER_FAIL = 'REQUEST_PROFILED_USER_FAIL';
export const REQUEST_PRODUCT_FAVORITES_SUCCESS =
  'REQUEST_PRODUCT_FAVORITES_SUCCESS';
export const REQUEST_PRODUCT_FAVORITES_FAIL = 'REQUEST_PRODUCT_FAVORITES_Fail';
export const REQUEST_LIKE_PRODUCT_SUCCESS = 'REQUEST_LIKE_PRODUCT_SUCCESS';
export const REQUEST_LIKE_PRODUCT_FAIL = 'REQUEST_LIKE_PRODUCT_FAIL';
export const REQUEST_UNLIKE_PRODUCT_SUCCESS = 'REQUEST_UNLIKE_PRODUCT_SUCCESS';
export const REQUEST_UNLIKE_PRODUCT_FAIL = 'REQUEST_UNLIKE_PRODUCT_FAIL';

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

export const requestProductFavoritesSuccess = payload => ({
  type: REQUEST_PRODUCT_FAVORITES_SUCCESS,
  payload,
});

export const requestProductFavoritesFail = payload => ({
  type: REQUEST_PRODUCT_FAVORITES_FAIL,
  payload,
});

export const requestLikeProductSuccess = payload => ({
  type: REQUEST_LIKE_PRODUCT_SUCCESS,
  payload,
});

export const requestLikeProductFail = payload => ({
  type: REQUEST_LIKE_PRODUCT_FAIL,
  payload,
});

export const requestUnLikeProductSuccess = payload => ({
  type: REQUEST_UNLIKE_PRODUCT_SUCCESS,
  payload,
});

export const requestUnLikeProductFail = payload => ({
  type: REQUEST_UNLIKE_PRODUCT_FAIL,
  payload,
});
