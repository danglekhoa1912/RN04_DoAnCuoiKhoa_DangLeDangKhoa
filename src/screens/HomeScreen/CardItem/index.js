import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import AntIcon from 'react-native-vector-icons/AntDesign';

import {Text} from '../../../components';
import {COLORS} from '../../../themes';
import {navigate} from '../../../navigation/NavigationWithoutProp';
import {stackName} from '../../../configs/NavigationContants';

const CardItem = ({product}) => {
  const [isFavourite, setIsFavourite] = useState(false);

  const handleFavourite = () => {
    setIsFavourite(!isFavourite);
  };

  const onPress = () => {
    navigate(stackName.detailStack, {id: product.id});
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
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
      }}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text bold>${product.price}</Text>
        <TouchableOpacity onPress={handleFavourite}>
          <AntIcon
            name={isFavourite ? 'heart' : 'hearto'}
            color="#fec2c3"
            size={25}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={{uri: product.image}}
          style={{width: 150, height: 130}}
        />
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text bold>{product.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CardItem;

const styles = StyleSheet.create({});
