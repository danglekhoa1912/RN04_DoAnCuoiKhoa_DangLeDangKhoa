import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AntIcon from 'react-native-vector-icons/AntDesign';

import {
  requestListCategory,
  requestListProduct,
} from '../../redux/thunk/ProductActionThunk';
import {COLORS} from '../../themes';
import {BackgroundView, Text} from '../../components/index';
import CardItem from './CardItem';
import {requestProfileUser} from '../../redux/thunk/UserActionThunk';
import {Spinner} from '@ui-kitten/components';

const HomeScreen = props => {
  const [isAllProduct, setIsAllProduct] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [nameCategory, setNameCategory] = useState('ADIDAS');

  const profile = useSelector(state => state.UserReducer.profile);
  const token = useSelector(state => state.UserReducer.token);
  const listProduct = useSelector(state => state.ProductReducer.listProducts);
  const listCategory = useSelector(
    state => state.ProductReducer.listCategories,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestListProduct());
    dispatch(requestListCategory());
    dispatch(requestProfileUser(token));
  }, []);

  useEffect(() => {
    setIsLoading(false);
  }, [profile]);

  const renderListCategory = ({category, id}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setNameCategory(id);
        }}>
        <Text color={nameCategory == id ? COLORS.lightBack : COLORS.white}>
          {category}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderAllProducts = () => {
    return (
      <View style={styles.containerProduct}>
        <FlatList
          numColumns={2}
          data={listProduct}
          renderItem={({item}) => <CardItem product={item} />}
          ItemSeparatorComponent={() => <View style={{height: 30}} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 300,
            flexDirection: 'column',
            paddingTop: 15,
          }}
          columnWrapperStyle={{flex: 1, justifyContent: 'space-between'}}
        />
      </View>
    );
  };

  const renderCategoryProduct = () => {
    const listProductCategory = listProduct.filter(item =>
      JSON.parse(item.categories).some(
        category => category.id === nameCategory,
      ),
    );
    return (
      <View>
        <View style={styles.containerListCategory}>
          <FlatList
            style={{flexGrow: 0, marginVertical: 10, marginHorizontal: 10}}
            data={listCategory}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{width: 30}} />}
            renderItem={({item}) => {
              return renderListCategory(item);
            }}
          />
        </View>
        <View style={styles.containerProduct}>
          <FlatList
            numColumns={2}
            data={listProductCategory}
            renderItem={({item}) => <CardItem product={item} />}
            ItemSeparatorComponent={() => <View style={{height: 30}} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 380,
              flexDirection: 'column',
            }}
            columnWrapperStyle={{flex: 1, justifyContent: 'space-between'}}
          />
        </View>
      </View>
    );
  };

  return (
    <>
      {isLoading ? (
        <BackgroundView style={styles.loading}>
          <Spinner />
        </BackgroundView>
      ) : (
        <BackgroundView style={styles.container}>
          <View style={styles.header}>
            <View style={styles.containerUser}>
              <Image style={styles.avatar} source={{uri: profile.avatar}} />
              <Text bold title>
                Welcome {profile.name}
              </Text>
            </View>
            <TouchableOpacity>
              <AntIcon name="shoppingcart" size={30} />
            </TouchableOpacity>
          </View>
          <View style={styles.containerTitle}>
            <TouchableOpacity
              onPress={() => {
                setIsAllProduct(true);
              }}>
              <Text
                color={isAllProduct ? COLORS.lightBack : COLORS.white}
                bold
                header>
                All
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setIsAllProduct(false);
              }}>
              <Text
                color={!isAllProduct ? COLORS.lightBack : COLORS.white}
                bold
                header>
                Categories
              </Text>
            </TouchableOpacity>
          </View>
          {isAllProduct ? renderAllProducts() : renderCategoryProduct()}
        </BackgroundView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    margin: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerUser: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  containerTitle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  title: {
    color: COLORS.lightBack,
  },
  containerProduct: {
    marginHorizontal: 20,
  },
});

export default HomeScreen;
