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
export const REQUEST_EDIT_PROFILE_SUCCESS = 'REQUEST_EDIT_PROFILE_SUCCESS';
export const REQUEST_EDIT_PROFILE_FAIL = 'REQUEST_EDIT_PROFILE_FAIL';
export const REQUEST_CHANGE_PASSWORD_SUCCESS =
  'REQUEST_CHANGE_PASSWORD_SUCCESS';
export const REQUEST_CHANGE_PASSWORD_FAIL = 'REQUEST_CHANGE_PASSWORD_FAIL';
export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART';
export const REMOVE_PRODUCT_TO_CART = 'REMOVE_PRODUCT_TO_CART';
export const CHANGE_QUANTITY_PRODUCT_IN_CART =
  'CHANGE_QUANTITY_PRODUCT_IN_CART';
export const REQUEST_ADD_ORDER_SUCCESS = 'REQUEST_ADD_ORDER_SUCCESS';
export const REQUEST_ADD_ORDER_FAIL = 'REQUEST_ADD_ORDER_FAIL';
export const REQUEST_REMOVE_ORDER_SUCCESS = 'REQUEST_REMOVE_ORDER_SUCCESS';
export const REQUEST_REMOVE_ORDER_FAIL = 'REQUEST_REMOVE_ORDER_FAIL';
export const LOGIN_WITH_FACEBOOK_SUCCESS = 'LOGIN_WITH_FACEBOOK_SUCCESS';
export const LOGIN_WITH_FACEBOOK_FAIL = 'LOGIN_WITH_FACEBOOK_FAIL';

export const requestLoginUserSuccess = payload => ({
  type: REQUEST_LOGIN_USER_SUCCESS,
  payload,
});

export const requestLoginUserFail = payload => ({
  type: REQUEST_LOGIN_USER_FAIL,
  payload,
});

export const requestProfiledUserSuccess = (profile, listProductInCart) => ({
  type: REQUEST_PROFILED_USER_SUCCESS,
  payload: {
    profile,
    listProductInCart,
  },
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

export const requetsEditProfileSuccess = payload => ({
  type: REQUEST_EDIT_PROFILE_SUCCESS,
  payload,
});

export const requetsEditProfileFail = payload => ({
  type: REQUEST_EDIT_PROFILE_FAIL,
  payload,
});

export const requestChangePasswordSuccess = payload => ({
  type: REQUEST_CHANGE_PASSWORD_SUCCESS,
  payload,
});

export const requestChangePasswordFail = payload => ({
  type: REQUEST_CHANGE_PASSWORD_FAIL,
  payload,
});

export const addProductToCartSuccess = (product, size, quantity) => ({
  type: ADD_PRODUCT_TO_CART,
  payload: {
    product,
    size,
    quantity,
  },
});

export const removeProductToCartSuccess = payload => ({
  type: REMOVE_PRODUCT_TO_CART,
  payload,
});

export const changeQuantityProductInCartSuccess = (quantity, index) => ({
  type: CHANGE_QUANTITY_PRODUCT_IN_CART,
  payload: {quantity, index},
});

export const requestAddOrderSuccess = () => ({
  type: REQUEST_ADD_ORDER_SUCCESS,
});

export const requestAddOrderFail = () => ({
  type: REQUEST_ADD_ORDER_FAIL,
});

export const loginWithFacebookSuccess = payload => ({
  type: LOGIN_WITH_FACEBOOK_SUCCESS,
  payload,
});

export const loginWithFacebookFail = payload => ({
  type: LOGIN_WITH_FACEBOOK_FAIL,
  payload,
});
