export const REQUEST_LIST_PRODUCT_SUCCESS = 'REQUEST_LIST_PRODUCT_SUCCESS';
export const REQUEST_LIST_PRODUCT_FAIL = 'REQUEST_LIST_PRODUCT_FAIL';
export const REQUEST_PRODUCT_DETAIL_SUCCESS = 'REQUEST_PRODUCT_DETAIL_SUCCESS';
export const REQUEST_PRODUCT_DETAIL_FAIL = 'REQUEST_PRODUCT_DETAIL_FAIL';
export const REQUEST_LIST_CATEGORY_SUCCESS = 'REQUEST_LIST_CATEGORY_SUCCESS';
export const REQUEST_LIST_CATEGORY_FAIL = 'REQUEST_LIST_CATEGORY_FAIL';

export const requestListProductSuccess = payload => ({
  type: REQUEST_LIST_PRODUCT_SUCCESS,
  payload,
});

export const requestListProductFail = payload => ({
  type: REQUEST_LIST_PRODUCT_FAIL,
  payload,
});

export const requestProductDetailSuccess = payload => ({
  type: REQUEST_PRODUCT_DETAIL_SUCCESS,
  payload,
});

export const requestProductDetailFail = payload => ({
  type: REQUEST_PRODUCT_DETAIL_FAIL,
  payload,
});

export const requestListCategorySuccess = payload => ({
  type: REQUEST_LIST_CATEGORY_SUCCESS,
  payload,
});

export const requestListCategoryFail = payload => ({
  type: REQUEST_LIST_CATEGORY_FAIL,
  payload,
});
