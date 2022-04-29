import axios from 'axios';
import Toast from 'react-native-simple-toast';

import {stackName} from '../../configs/NavigationContants';
import {navigate} from '../../navigation/NavigationWithoutProp';
import {
  requestLoginUserFail,
  requestLoginUserSuccess,
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
      Toast.show('Đăng nhập thành công', Toast.LONG);
      dispatch(requestLoginUserSuccess(response.data.content.accessToken));
      navigate(stackName.homeStack);
    } catch (e) {
      if (e.message.includes('404'))
        Toast.show('Sai email hoặc mật khẩu!', Toast.LONG);
      if (e.message.includes('400'))
        Toast.show('Đăng nhập thất bại!', Toast.LONG);
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
      console.log(response.data);
      dispatch(requestProfiledUserSuccess(response.data.content));
    } catch (e) {
      console.log(e);
      dispatch(requestProfiledUserFail(e));
    }
  };
};
