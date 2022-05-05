import {StyleSheet, View, TouchableOpacity, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {BackgroundView, Text} from '../../components';
import {COLORS} from '../../themes';
import {requestListProduct} from '../../redux/thunk/ProductActionThunk';
import ItemCardOption from './ItemCardOption';
import {goBack} from '../../navigation/NavigationWithoutProp';
import {requestAddOrder} from '../../redux/thunk/UserActionThunk';

const CartScreen = () => {
  const listProductInCart = useSelector(
    state => state.UserReducer.listProductInCart,
  );
  const profile = useSelector(state => state.UserReducer.profile);

  const [quantity, setQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(requestListProduct());
  }, []);

  useEffect(() => {
    setQuantity(0);
    setTotalPrice(0);
    listProductInCart.map(product => {
      setQuantity(quantity => quantity + product.quantity);
      setTotalPrice(price => price + product.quantity * product.product.price);
    });
  }, [listProductInCart]);

  const onPressBack = () => {
    goBack();
  };

  const onPressOrder = () => {
    const orderDetail = listProductInCart.map(product => ({
      productId: product.product.id,
      quantity: product.quantity,
    }));
    dispatch(requestAddOrder(orderDetail, profile.email));
  };

  const renderEmptyProduct = () => {
    return (
      <BackgroundView style={{justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={onPressBack}
          style={styles.containerButtonBack}>
          <Ionicons
            name="ios-chevron-back-circle-sharp"
            size={45}
            color={COLORS.secondary}
          />
        </TouchableOpacity>
        <Text>OOPS! Bạn chưa có sản phẩm nào trong giỏ</Text>
      </BackgroundView>
    );
  };

  return (
    <>
      {listProductInCart.length > 0 ? (
        <BackgroundView style={styles.container}>
          <TouchableOpacity
            onPress={onPressBack}
            style={styles.containerButtonBack}>
            <Ionicons
              name="ios-chevron-back-circle-sharp"
              size={45}
              color={COLORS.secondary}
            />
          </TouchableOpacity>
          <View style={styles.containerHeader}>
            <Text bold header>
              My Cart
            </Text>
            <Text subText>Check and pay your shoes</Text>
          </View>
          <FlatList
            data={listProductInCart}
            renderItem={({item, index}) => (
              <ItemCardOption index={index} productDetail={item} />
            )}
            ItemSeparatorComponent={() => <View style={{height: 30}} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 20,
            }}
            decelerationRate={'fast'}
          />
          <View style={styles.containerTotal}>
            <Text>item: {quantity}</Text>
            <Text>${totalPrice}</Text>
          </View>
          <TouchableOpacity
            onPress={onPressOrder}
            style={styles.buttonCheckOut}>
            <Text bold title color={COLORS.white}>
              Check Out
            </Text>
          </TouchableOpacity>
        </BackgroundView>
      ) : (
        renderEmptyProduct()
      )}
    </>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  containerHeader: {
    marginVertical: 20,
    marginLeft: 40,
  },
  containerButtonBack: {
    position: 'absolute',
    top: 30,
    left: 10,
  },

  containerTotal: {
    backgroundColor: COLORS.lighhtBlue,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderRadius: 40,
    marginVertical: 20,
  },
  buttonCheckOut: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    marginHorizontal: 40,
    backgroundColor: COLORS.secondary,
    borderRadius: 30,
    marginBottom: 40,
  },
});
