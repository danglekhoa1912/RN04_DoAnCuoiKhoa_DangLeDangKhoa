import {
  REQUEST_LIST_PRODUCT_SUCCESS,
  REQUEST_PRODUCT_DETAIL_SUCCESS,
} from '../actions/ProductAction';

const initialState = {
  listProducts: [],
  product: {},
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case REQUEST_LIST_PRODUCT_SUCCESS:
      return {...state, listProducts: payload};
    case REQUEST_PRODUCT_DETAIL_SUCCESS:
      return {...state, product: payload};
    default:
      return state;
  }
};
