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

const CardItem = ({product, favorite}) => {
  const [isFavourite, setIsFavourite] = useState(favorite);
  const token = useSelector(state => state.UserReducer.token);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsFavourite(favorite);
  }, [favorite]);

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
        <Text bold>${product.price}</Text>
        <TouchableOpacity onPress={handleFavourite}>
          <AntIcon
            name={isFavourite ? 'heart' : 'hearto'}
            color="#fec2c3"
            size={25}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.containerImage}>
        <Image
          source={{uri: product.image}}
          style={{width: 150, height: 130}}
        />
      </View>
      <View style={styles.containerName}>
        <Text bold>{product.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CardItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    width: 160,
    height: 200,
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
    justifyContent: 'space-between',
  },
  containerImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerName: {justifyContent: 'center', alignItems: 'center'},
});
