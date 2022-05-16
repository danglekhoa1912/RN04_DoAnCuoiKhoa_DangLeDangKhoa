import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';

import {COLORS} from '../../../themes';
import {Text} from '../../../components';
import {navigate} from '../../../navigation/NavigationWithoutProp';
import {stackName} from '../../../configs/NavigationContants';

const CardOrder = ({order}) => {
  const dateOrder = order.date.split('T');
  const date = dateOrder[0];
  const time = dateOrder[1];

  const onPressDetailOrder = () => {
    navigate(stackName.detailOrderScreen, {order});
  };

  return (
    <View style={styles.containerCard}>
      <Text bold title>
        #{order.id}
      </Text>
      <View style={styles.containerDateOrder}>
        <Text style={{marginRight: 10}}>Ngày đặt:{date}</Text>
        <Text>Lúc:{time}</Text>
      </View>
      <TouchableOpacity onPress={onPressDetailOrder} style={styles.button}>
        <Text content style={styles.text}>
          Chi tiết đơn hàng
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CardOrder;

const styles = StyleSheet.create({
  containerCard: {
    height: 110,
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
    justifyContent: 'space-between',
  },
  containerDateOrder: {
    flexDirection: 'row',
  },
  button: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: COLORS.secondary,
    paddingVertical: 5,
    paddingHorizontal: 8,
    alignSelf: 'flex-start',
  },
  text: {
    color: COLORS.secondary,
  },
});
