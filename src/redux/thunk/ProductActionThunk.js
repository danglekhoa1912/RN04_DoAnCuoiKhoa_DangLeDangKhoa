import axios from 'axios';
import {
  requestListCategoryFail,
  requestListCategorySuccess,
  requestListProductFail,
  requestListProductSuccess,
} from '../actions/ProductAction';

export const requestListProduct = () => {
  return async dispatch => {
    try {
      const response = await axios({
        method: 'GET',
        url: 'http://svcy3.myclass.vn/api/Product',
      });
      dispatch(requestListProductSuccess(response.data));
    } catch (e) {
      console.log(e);
      dispatch(requestListProductFail(e));
    }
  };
};

export const requestListCategory = () => {
  return async dispatch => {
    try {
      const response = await axios({
        method: 'GET',
        url: 'http://svcy3.myclass.vn/api/Product/getAllCategory',
      });
      dispatch(requestListCategorySuccess(response.data));
    } catch (e) {
      console.log(e);
      dispatch(requestListCategoryFail(e));
    }
  };
};
