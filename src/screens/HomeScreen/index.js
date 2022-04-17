import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {
  requestListCategory,
  requestListProduct,
} from '../../redux/thunk/ProductActionThunk';
import {COLORS} from '../../themes';
import {BackgroundView, Text} from '../../components/index';
import {Facebook} from '../../assets';

const HomeScreen = () => {
  const listProduct = useSelector(state => state.ProductReducer.listProducts);
  const listCategory = useSelector(
    state => state.ProductReducer.listCategories,
  ).content;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(requestListProduct());
    dispatch(requestListCategory());
  }, []);

  const renderListCategory = ({category}) => {
    return (
      <TouchableOpacity onPress={console.log('hi')}>
        <Text>{category}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <BackgroundView style={styles.container}>
      <View style={styles.containerAvatar}>
        <Image style={styles.avatar} source={Facebook} />
      </View>
      <View style={styles.containerTitle}>
        <TouchableOpacity>
          <Text color={COLORS.lightBack} bold header>
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text color={COLORS.lightBack} bold header>
            Categories
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.containerListCategory}>
        <FlatList
          style={{flexGrow: 0, marginVertical: 15, marginHorizontal: 10}}
          data={listCategory}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{width: 30}} />}
          renderItem={({item}) => {
            return renderListCategory(item);
          }}
        />
      </View>
      <View style={styles.containerProduct}></View>
    </BackgroundView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.backgroundColor,
    flex: 1,
  },
  containerAvatar: {
    margin: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  containerTitle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  title: {
    color: COLORS.lightBack,
  },
});

export default HomeScreen;
