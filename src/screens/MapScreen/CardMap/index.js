import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';

import {COLORS} from '../../../themes';
import {Text} from '../../../components';
import {navigate} from '../../../navigation/NavigationWithoutProp';
import {stackName} from '../../../configs/NavigationContants';

const CardMap = ({store}) => {
  const onPress = () => {
    navigate(stackName.detailMapScreen, store);
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.containerCard}>
      <Image source={{uri: store.image}} style={styles.image} />
      <View style={styles.containerContent}>
        <Text bold content>
          {store.name}
        </Text>
        <Text content>{store.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CardMap;

const styles = StyleSheet.create({
  containerCard: {
    height: 150,
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 130,
    height: 100,
    borderRadius: 10,
  },
  containerContent: {
    justifyContent: 'center',
    marginLeft: 10,
  },
});
