import {replaceEndLine} from '../../utils';
import {
  REQUEST_LIST_CATEGORY_SUCCESS,
  REQUEST_LIST_PRODUCT_SUCCESS,
  REQUEST_PRODUCT_DETAIL_SUCCESS,
  REQUEST_STORE_SUCCESS,
} from '../actions/ProductAction';

const initialState = {
  listProducts: [],
  product: {},
  listCategories: [],
  listStore: [],
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case REQUEST_LIST_PRODUCT_SUCCESS:
      return {...state, listProducts: payload};
    case REQUEST_PRODUCT_DETAIL_SUCCESS:
      return {...state, product: replaceEndLine(payload)};
    case REQUEST_LIST_CATEGORY_SUCCESS:
      return {...state, listCategories: payload};
    case REQUEST_STORE_SUCCESS:
      return {...state, listStore: payload};
    default:
      return state;
  }
};
