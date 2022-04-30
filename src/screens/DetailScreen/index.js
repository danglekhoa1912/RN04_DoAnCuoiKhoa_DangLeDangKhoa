import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntIcon from 'react-native-vector-icons/AntDesign';

import {BackgroundView, Text} from '../../components';
import {COLORS} from '../../themes';
import {goBack} from '../../navigation/NavigationWithoutProp';
import {useDispatch, useSelector} from 'react-redux';
import {requestProductDetail} from '../../redux/thunk/ProductActionThunk';
import {IndexPath, Select, SelectItem, Spinner} from '@ui-kitten/components';

const DetailScreen = props => {
  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));
  const [isLoading, setIsLoading] = useState(true);
  const onPressBack = () => {
    goBack();
  };

  const renderListSize = size => <SelectItem key={size} title={size} />;
  const product = useSelector(state => state.ProductReducer.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestProductDetail(props.route.params.id));
  }, []);
  useEffect(() => {
    if (product.size) {
      setIsLoading(false);
    }
  }, [product]);
  return (
    <>
      {isLoading ? (
        <BackgroundView style={styles.loading}>
          <Spinner />
        </BackgroundView>
      ) : (
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
              {product.shortDescription}
            </Text>
          </View>
          <View style={styles.containerImage}>
            <Image style={styles.image} source={{uri: product.image}} />
          </View>
          <ScrollView style={styles.containerDescription}>
            <View style={{marginHorizontal: 20, marginBottom: 10, flex: 1}}>
              <Text bold title>
                Description
              </Text>
              <Text bold color={COLORS.gray} content>
                {product.description}
              </Text>
              <Text style={{paddingVertical: 10}} content bold>
                Price: <Text color={COLORS.secondary}>$</Text>
                {product.price}
              </Text>
              <View style={styles.containerOption}>
                <View style={styles.selectOption}>
                  <Text subText bold title>
                    Size
                  </Text>
                  <Select
                    status="control"
                    value={product.size[selectedIndex.row]}
                    selectedIndex={selectedIndex}
                    style={styles.select}
                    onSelect={index => setSelectedIndex(index)}>
                    {product.size.map(renderListSize)}
                  </Select>
                </View>
                <View style={styles.selectOption}>
                  <Text subText bold title>
                    QTY
                  </Text>
                  <Select
                    status="control"
                    value={product.size[selectedIndex.row]}
                    selectedIndex={selectedIndex}
                    style={styles.select}
                    onSelect={index => setSelectedIndex(index)}>
                    {product.size.map(renderListSize)}
                  </Select>
                </View>
              </View>
              <View style={styles.containerButtonAdd}>
                <TouchableOpacity style={styles.buttonAdd}>
                  <Text title bold color={COLORS.white}>
                    Add to cart
                  </Text>
                  <AntIcon name="shoppingcart" size={30} color={COLORS.white} />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </BackgroundView>
      )}
    </>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
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
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingTop: 10,
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  selectOption: {
    alignItems: 'center',
  },
  select: {
    width: 100,
    // flex: 1,
    backgroundColor: COLORS.secondary,
    borderRadius: 20,
  },
  containerButtonAdd: {
    backgroundColor: COLORS.secondary,
    height: 50,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 80,
    marginVertical: 20,
  },
  buttonAdd: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});
