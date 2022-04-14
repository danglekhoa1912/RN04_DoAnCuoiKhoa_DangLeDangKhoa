import axios from 'axios';
import {requestListProductFail} from '../actions/ProductAction';

export const requestListProduct = () => {
  return async dispatch => {
    try {
      const response = await axios({
        method: 'GET',
        url: 'http://svcy3.myclass.vn/api/Product',
      });
      console.log(response.data);
    } catch (e) {
      console.log(e);
      dispatch(requestListProductFail(e));
    }
  };
};
