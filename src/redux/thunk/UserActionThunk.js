import axios from 'axios';
import Toast from 'react-native-simple-toast';

import {stackName} from '../../configs/NavigationContants';
import {replace} from '../../navigation/NavigationWithoutProp';
import {getData} from '../../utils';
import {
  addProductToCartSuccess,
  changeQuantityProductInCartSuccess,
  loginWithFacebookSuccess,
  removeProductToCartSuccess,
  requestAddOrderFail,
  requestAddOrderSuccess,
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

export const loginWithFacebook = facebookToken => {
  return async dispatch => {
    try {
      const response = await axios({
        method: 'POST',
        url: 'http://svcy3.myclass.vn/api/Users/facebooklogin',
        data: {
          facebookToken,
        },
      });
      Toast.show('Đăng nhập thành công', Toast.SHORT);
      dispatch(loginWithFacebookSuccess(response.data.content.accessToken));
      replace(stackName.homeStack);
    } catch (e) {
      console.log(e);
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
      getData(response.data.content.email).then(value => {
        dispatch(requestProfiledUserSuccess(response.data.content, value));
      });
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
    } catch (e) {
      console.log(e);
      // dispatch(requestProductFavoritesFail(e));
    }
  };
};

export const requestEditProfile = (email, name, gender, phone, token) => {
  return async dispatch => {
    try {
      const response = await axios({
        method: 'POST',
        url: 'http://svcy3.myclass.vn/api/Users/updateProfile',
        headers: {Authorization: `Bearer ${token}`},
        data: {
          email,
          password: '',
          name,
          gender,
          phone,
        },
      });
      Toast.show('Cập nhật tài khoản thành công!');
    } catch (e) {
      console.log(e);
      Toast.show('Không thể cập nhật tài khoản!', Toast.SHORT);
    }
  };
};

export const requestChangePassword = (newPassword, token) => {
  return async dispatch => {
    try {
      const response = await axios({
        method: 'POST',
        url: 'http://svcy3.myclass.vn/api/Users/changePassword',
        headers: {Authorization: `Bearer ${token}`},
        data: {
          newPassword,
        },
      });
      Toast.show('Cập nhật mật khẩu thành công!');
    } catch (e) {
      console.log(e);
      Toast.show('Không thể thay đổi mật khẩu!', Toast.SHORT);
    }
  };
};

export const addProductToCart = (product, size, quantity) => {
  return async dispatch => {
    Toast.show('Thêm vào giỏ hàng thành công', Toast.SHORT);
    try {
      dispatch(addProductToCartSuccess(product, size, quantity));
    } catch (e) {
      Toast.show('Lỗi! Vui lòng thử lại sau', Toast.SHORT);
      console.log(e);
    }
  };
};

export const removeProductToCart = index => {
  return async dispatch => {
    try {
      dispatch(removeProductToCartSuccess(index));
      Toast.show('Xóa sản phẩm khỏi giỏ thành công', Toast.SHORT);
    } catch (e) {
      Toast.show('Lỗi! Vui lòng thử lại sau', Toast.SHORT);
      console.log(e);
    }
  };
};

export const changeQuantityProductInCart = (quantity, index) => {
  return async dispatch => {
    try {
      dispatch(changeQuantityProductInCartSuccess(quantity, index));
    } catch (e) {
      console.log(e);
    }
  };
};

export const requestAddOrder = (orderDetail, email) => {
  return async dispatch => {
    try {
      const response = await axios({
        method: 'POST',
        url: 'http://svcy3.myclass.vn/api/Users/order',
        data: {
          orderDetail,
          email,
        },
      });
      dispatch(requestAddOrderSuccess());
      Toast.show(response.data.content, Toast.SHORT);
    } catch (e) {
      console.log(e);
      dispatch(requestAddOrderFail());
      Toast.show(e.message, Toast.SHORT);
    }
  };
};

export const requestRemoveOrder = (token, orderId) => {
  return async dispatch => {
    try {
      const response = await axios({
        method: 'POST',
        url: 'http://svcy3.myclass.vn/api/Users/deleteOrder',
        headers: {Authorization: `Bearer ${token}`},
        data: {
          orderId,
        },
      });
      Toast.show('Xóa đơn hàng thành công!');
      dispatch(requestProfileUser(token));
    } catch (e) {
      console.log(e);
      Toast.show('Không thể xóa đơn hàng!', Toast.SHORT);
    }
  };
};
