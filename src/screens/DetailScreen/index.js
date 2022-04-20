import {StyleSheet, TouchableOpacity, View, Image} from 'react-native';
import React, {useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {BackgroundView, Text} from '../../components';
import {COLORS} from '../../themes';
import {goBack} from '../../navigation/NavigationWithoutProp';
import {useDispatch, useSelector} from 'react-redux';
import {requestProductDetail} from '../../redux/thunk/ProductActionThunk';

const DetailScreen = props => {
  const onPressBack = () => {
    goBack();
  };

  const product = useSelector(state => state.ProductReducer.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestProductDetail(props.route.params.id));
  }, []);

  return (
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
      <View style={styles.containerTitle}>
        <Text bold header>
          {product.name}
        </Text>
        <Text bold color={COLORS.gray} susubTextb>
          {product.shortDescription.replace('\r\n\r\n', '\r\n')}
        </Text>
      </View>
      <View style={styles.containerImage}>
        <Image style={styles.image} source={{uri: product.image}} />
      </View>
      <View style={styles.containerDescription}>
        <Text bold title>
          Description
        </Text>
        <Text bold color={COLORS.gray} content>
          {product.description.replace('\r\n\r\n', '\r\n')}
        </Text>
        <Text content bold>
          Price: <Text color={COLORS.secondary}>$</Text>
          {product.price}
        </Text>
        <View style={styles.containerOption}></View>
      </View>
    </BackgroundView>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  containerButtonBack: {
    marginTop: 10,
  },
  containerTitle: {},
  containerImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '80%',
    height: 200,
  },
  containerDescription: {
    backgroundColor: COLORS.white,
    flex: 1,
    marginHorizontal: -20,
    borderTopStartRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  containerOption: {
    backgroundColor: COLORS.lighhtBlue,
    height: 80,
    borderRadius: 30,
    shadowColor: COLORS.lightBack,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
