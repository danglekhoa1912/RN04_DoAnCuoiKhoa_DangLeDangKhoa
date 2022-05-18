import {StyleSheet, View, Image} from 'react-native';
import React from 'react';

import {Text} from '../../../components';
import {COLORS} from '../../../themes';

const CardDetailOrder = ({product}) => {
  return (
    <View style={styles.containerCard}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <Image style={styles.image} source={{uri: product.image}} />
        <View style={styles.containerDateOrder}>
          <Text content bold>
            {product.name}
          </Text>
          <Text>{product.shortDescription}</Text>
        </View>
      </View>
    </View>
  );
};

export default CardDetailOrder;

const styles = StyleSheet.create({
  containerCard: {
    height: 120,
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
  image: {
    width: 150,
    height: 100,
  },
  containerDateOrder: {
    flexShrink: 1,
    justifyContent: 'center',
    textAlign: 'center',
  },
});
