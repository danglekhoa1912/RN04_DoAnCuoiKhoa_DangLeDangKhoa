import {replaceEndLine} from '../../utils';
import {
  REQUEST_LIST_CATEGORY_SUCCESS,
  REQUEST_LIST_PRODUCT_SUCCESS,
  REQUEST_PRODUCT_DETAIL_SUCCESS,
} from '../actions/ProductAction';

const initialState = {
  listProducts: [],
  product: {},
  listCategories: [],
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case REQUEST_LIST_PRODUCT_SUCCESS:
      return {...state, listProducts: payload};
    case REQUEST_PRODUCT_DETAIL_SUCCESS:
      // const newState = {...state};
      // newState.product = replaceEndLine(payload);
      // return newState;
      return {...state, product: replaceEndLine(payload)};
    case REQUEST_LIST_CATEGORY_SUCCESS:
      return {...state, listCategories: payload};

    default:
      return state;
  }
};
