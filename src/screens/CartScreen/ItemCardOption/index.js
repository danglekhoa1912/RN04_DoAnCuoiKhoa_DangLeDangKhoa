import {StyleSheet, TouchableOpacity, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Swipeable, GestureHandlerRootView} from 'react-native-gesture-handler';
import NumericInput from 'react-native-numeric-input';
import AntIcon from 'react-native-vector-icons/AntDesign';

import {COLORS} from '../../../themes';
import {Text} from '../../../components';
import {useDispatch} from 'react-redux';
import {
  changeQuantityProductInCart,
  removeProductToCart,
} from '../../../redux/thunk/UserActionThunk';

const RenderRight = ({onPressDelete}) => {
  return (
    <TouchableOpacity onPress={onPressDelete} style={styles.option}>
      <AntIcon size={20} name="delete" />
    </TouchableOpacity>
  );
};

const ItemCardOption = ({productDetail, index}) => {
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

  const onPressDelete = () => {
    dispatch(removeProductToCart(index));
  };

  return (
    <GestureHandlerRootView>
      <Swipeable
        renderRightActions={() => (
          <RenderRight onPressDelete={onPressDelete} />
        )}>
        <TouchableOpacity style={styles.card}>
          <Text content>{productDetail.product.name}</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View>
              <View style={{flexDirection: 'row'}}>
                <Text bold color={COLORS.secondary}>
                  $
                </Text>
                <Text bold>{productDetail.product.price}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <NumericInput
                  totalWidth={100}
                  totalHeight={50}
                  rounded
                  minValue={1}
                  maxValue={productDetail.product.quantity}
                  borderColor={COLORS.white}
                  value={quantity}
                  initValue={productDetail.quantity}
                  onChange={value => {
                    dispatch(changeQuantityProductInCart(value, index));
                    setQuantity(value);
                  }}
                />
                <Text style={{marginHorizontal: 5}}>|</Text>
                <Text>Size:{productDetail.size}</Text>
              </View>
            </View>
            <Image
              style={{height: 50, width: 100}}
              source={{uri: productDetail.product.image}}
            />
          </View>
        </TouchableOpacity>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

export default ItemCardOption;

const styles = StyleSheet.create({
  card: {
    height: 100,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 4,
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  option: {
    width: 60,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.lighhtBlue,
    borderRadius: 15,
    marginLeft: 10,
  },
});
