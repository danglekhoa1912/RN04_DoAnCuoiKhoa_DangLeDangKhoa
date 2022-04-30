import {
  REQUEST_LOGIN_USER_FAIL,
  REQUEST_LOGIN_USER_SUCCESS,
  REQUEST_PRODUCT_FAVORITES_SUCCESS,
  REQUEST_PROFILED_USER_FAIL,
  REQUEST_PROFILED_USER_SUCCESS,
} from '../actions/UserAction';

const initialState = {
  token: '',
  profile: {
    ordersHistory: [],
    email: '',
    name: '',
    password: '',
    gender: false,
    phone: '',
    facebookId: '',
    deleted: false,
    avatar: '',
  },
  listProductFavorites: [],
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case REQUEST_LOGIN_USER_SUCCESS:
      return {...state, token: payload};
    case REQUEST_LOGIN_USER_FAIL:
      return {...state, token: payload};
    case REQUEST_PROFILED_USER_SUCCESS:
      return {...state, profile: payload};
    case REQUEST_PROFILED_USER_FAIL:
      return {...state, profile: payload};
    case REQUEST_PRODUCT_FAVORITES_SUCCESS:
      return {...state, listProductFavorites: payload};
    default:
      return state;
  }
};
