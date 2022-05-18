import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {BackgroundView, Text} from '../../components';
import {COLORS} from '../../themes';
import ItemCardOption from './ItemCardOption';
import {goBack} from '../../navigation/NavigationWithoutProp';
import {requestAddOrder} from '../../redux/thunk/UserActionThunk';
import {storeData} from '../../utils';

const CartScreen = () => {
  const listProductInCart = useSelector(
    state => state.UserReducer.listProductInCart,
  );
  const profile = useSelector(state => state.UserReducer.profile);

  const [quantity, setQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setQuantity(0);
    setTotalPrice(0);
    listProductInCart.map(product => {
      setQuantity(quantity => quantity + product.quantity);
      setTotalPrice(price => price + product.quantity * product.product.price);
    });
    storeData(profile.email, listProductInCart);
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
    setModalVisible(true);
  };

  const renderEmptyProduct = () => {
    return (
      <BackgroundView style={{justifyContent: 'center', alignItems: 'center'}}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text title>Đặt hàng thành công!</Text>
              <Pressable
                style={styles.button}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Okey</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Text>OOPS! You have no products in your cart</Text>
      </BackgroundView>
    );
  };

  return (
    <>
      {listProductInCart.length > 0 ? (
        <BackgroundView style={styles.container}>
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
      <TouchableOpacity
        onPress={onPressBack}
        style={styles.containerButtonBack}>
        <Ionicons
          name="ios-chevron-back-circle-sharp"
          size={45}
          color={COLORS.secondary}
        />
      </TouchableOpacity>
    </>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: COLORS.secondary,
    marginTop: 10,
  },
});
