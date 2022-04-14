import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {requestListProduct} from '../../redux/thunk/ProductActionThunk';
const HomeScreen = () => {
  const listProduct = useSelector(state => state.ProductReducer.listProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestListProduct());
  }, []);

  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;
