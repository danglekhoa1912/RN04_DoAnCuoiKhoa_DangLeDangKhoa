import {
  ADD_PRODUCT_TO_CART,
  CHANGE_QUANTITY_PRODUCT_IN_CART,
  REMOVE_PRODUCT_TO_CART,
  REQUEST_ADD_ORDER_FAIL,
  REQUEST_ADD_ORDER_SUCCESS,
  REQUEST_LOGIN_USER_FAIL,
  REQUEST_LOGIN_USER_SUCCESS,
  REQUEST_PRODUCT_FAVORITES_SUCCESS,
  REQUEST_PROFILED_USER_FAIL,
  REQUEST_PROFILED_USER_SUCCESS,
  REQUEST_REMOVE_ORDER_FAIL,
  REQUEST_REMOVE_ORDER_SUCCESS,
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
  listProductInCart: [],
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
    case ADD_PRODUCT_TO_CART:
      const newArrayAdd = [...state.listProductInCart];
      newArrayAdd.push(payload);
      return {
        ...state,
        listProductInCart: newArrayAdd,
      };
    case REMOVE_PRODUCT_TO_CART:
      const newArrayRemove = [...state.listProductInCart];
      newArrayRemove.splice(payload, 1);
      return {
        ...state,
        listProductInCart: newArrayRemove,
      };
    case CHANGE_QUANTITY_PRODUCT_IN_CART:
      const newArrayChangeQuantity = [...state.listProductInCart];
      newArrayChangeQuantity[payload.index].quantity = payload.quantity;
      return {
        ...state,
        listProductInCart: newArrayChangeQuantity,
      };
    default:
      return state;
  }
};
