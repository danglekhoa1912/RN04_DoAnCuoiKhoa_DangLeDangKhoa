import axios from 'axios';
import Toast from 'react-native-simple-toast';

import {stackName} from '../../configs/NavigationContants';
import {navigate, replace} from '../../navigation/NavigationWithoutProp';
import {
  requestLikeProductSuccess,
  requestLoginUserFail,
  requestLoginUserSuccess,
  requestProductFavoritesFail,
  requestProductFavoritesSuccess,
  requestProfiledUserFail,
  requestProfiledUserSuccess,
} from '../actions/UserAction';

export const requestLoginUser = (email, password) => {
  return async dispatch => {
    try {
      const response = await axios({
        method: 'POST',
        url: 'http://svcy3.myclass.vn/api/Users/signin',
        data: {
          email,
          password,
        },
      });
      Toast.show('Đăng nhập thành công', Toast.SHORT);
      dispatch(requestLoginUserSuccess(response.data.content.accessToken));
      replace(stackName.homeStack);
    } catch (e) {
      if (e.message.includes('404'))
        Toast.show('Sai email hoặc mật khẩu!', Toast.LONG);
      if (e.message.includes('400'))
        Toast.show('Đăng nhập thất bại!', Toast.SHORT);
      dispatch(requestLoginUserFail(e.message));
    }
  };
};

export const requestProfileUser = token => {
  return async dispatch => {
    try {
      const response = await axios({
        method: 'POST',
        url: 'http://svcy3.myclass.vn/api/Users/getProfile',
        headers: {Authorization: `Bearer ${token}`},
      });
      dispatch(requestProfiledUserSuccess(response.data.content));
    } catch (e) {
      console.log(e);
      dispatch(requestProfiledUserFail(e));
    }
  };
};

export const requestProductFavorites = token => {
  return async dispatch => {
    try {
      const response = await axios({
        method: 'GET',
        url: 'http://svcy3.myclass.vn/api/Users/getproductfavorite',
        headers: {Authorization: `Bearer ${token}`},
      });
      dispatch(
        requestProductFavoritesSuccess(response.data.content.productsFavorite),
      );
    } catch (e) {
      console.log(e);
      dispatch(requestProductFavoritesFail(e));
    }
  };
};

export const requestLikeProduct = (id, token) => {
  return async dispatch => {
    try {
      const response = await axios({
        method: 'GET',
        url: `http://svcy3.myclass.vn/api/Users/like?productId=${id}`,
        headers: {Authorization: `Bearer ${token}`},
      });
      console.log(response.data);
      // dispatch(
      //   requestLikeProductSuccess(response.data.content.productsFavorite),
      // );
    } catch (e) {
      console.log(e);
      // dispatch(requestProductFavoritesFail(e));
    }
  };
};

export const requestUnLikeProduct = (id, token) => {
  return async dispatch => {
    try {
      const response = await axios({
        method: 'GET',
        url: `http://svcy3.myclass.vn/api/Users/unlike?productId=${id}`,
        headers: {Authorization: `Bearer ${token}`},
      });
      // dispatch(
      //   requestLikeProductSuccess(response.data.content.productsFavorite),
      // );
      console.log(response.data);
    } catch (e) {
      console.log(e);
      // dispatch(requestProductFavoritesFail(e));
    }
  };
};
