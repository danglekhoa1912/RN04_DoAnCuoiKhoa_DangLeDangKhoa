import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntIcon from 'react-native-vector-icons/AntDesign';

import {Text} from '../../../components';
import {COLORS} from '../../../themes';
import {navigate} from '../../../navigation/NavigationWithoutProp';
import {stackName} from '../../../configs/NavigationContants';
import {useDispatch, useSelector} from 'react-redux';
import {
  requestLikeProduct,
  requestUnLikeProduct,
} from '../../../redux/thunk/UserActionThunk';

const CardItemFavorite = ({product, favorite}) => {
  const [isFavourite, setIsFavourite] = useState(true);

  const token = useSelector(state => state.UserReducer.token);
  const dispatch = useDispatch();

  const handleFavourite = () => {
    setIsFavourite(!isFavourite);
    if (!isFavourite) dispatch(requestLikeProduct(product.id, token));
    else dispatch(requestUnLikeProduct(product.id, token));
  };

  const onPress = () => {
    navigate(stackName.detailStack, {id: product.id});
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.containerHeader}>
        <View style={styles.containerProduct}>
          <Image
            source={{uri: product.image}}
            style={{width: 150, height: 100}}
          />
          <Text bold>{product.name}</Text>
        </View>
        <TouchableOpacity onPress={handleFavourite}>
          <AntIcon
            name={isFavourite ? 'heart' : 'hearto'}
            color="#fec2c3"
            size={25}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default CardItemFavorite;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    height: 100,
    borderRadius: 15,
    padding: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  containerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  containerProduct: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
