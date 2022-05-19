import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Spinner} from '@ui-kitten/components';

import {
  requestListCategory,
  requestListProduct,
} from '../../redux/thunk/ProductActionThunk';
import {COLORS} from '../../themes';
import {BackgroundView, Text} from '../../components/index';
import CardItem from './CardItem';
import {
  requestProductFavorites,
  requestProfileUser,
} from '../../redux/thunk/UserActionThunk';
import {Avatar} from '../../assets';
import {navigate} from '../../navigation/NavigationWithoutProp';
import {stackName} from '../../configs/NavigationContants';

const HomeScreen = () => {
  const [isAllProduct, setIsAllProduct] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [nameCategory, setNameCategory] = useState('ADIDAS');
  const [refreshing, setRefreshing] = useState(false);

  const profile = useSelector(state => state.UserReducer.profile);
  const token = useSelector(state => state.UserReducer.token);
  const listProduct = useSelector(state => state.ProductReducer.listProducts);
  const listCategory = useSelector(
    state => state.ProductReducer.listCategories,
  );
  const listProductFavorites = useSelector(
    state => state.UserReducer.listProductFavorites,
  );

  const avatar = profile.avatar ? {uri: profile.avatar} : {Avatar};
  const dispatch = useDispatch();
  useEffect(() => {
    Promise.all([
      dispatch(requestListProduct()),
      dispatch(requestListCategory()),
      dispatch(requestProfileUser(token)),
      dispatch(requestProductFavorites(token)),
    ]).then(() => {
      setIsLoading(false);
    });
  }, []);

  const isFavourite = id => {
    return listProductFavorites.some(item => item.id === id);
  };

  const onRefresh = () => {
    dispatch(requestProductFavorites(token)).then(() => {
      setRefreshing(false);
    });
  };

  const onPressCart = () => {
    navigate(stackName.cartStack);
  };

  const onOrderHistory = () => {
    navigate(stackName.orderScreen, {token});
  };

  const renderListCategory = ({category, id}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setNameCategory(id);
        }}>
        <Text color={nameCategory == id ? COLORS.lightBack : COLORS.gray}>
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
          renderItem={({item}) => (
            <CardItem favorite={isFavourite(item.id)} product={item} />
          )}
          ItemSeparatorComponent={() => <View style={{height: 30}} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 250,
            flexDirection: 'column',
            paddingTop: 15,
          }}
          columnWrapperStyle={{flex: 1, justifyContent: 'space-between'}}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
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
            renderItem={({item}) => (
              <CardItem favorite={isFavourite(item.id)} product={item} />
            )}
            ItemSeparatorComponent={() => <View style={{height: 30}} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 320,
              flexDirection: 'column',
            }}
            columnWrapperStyle={{flex: 1, justifyContent: 'space-between'}}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
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
              <Image style={styles.avatar} source={avatar} />
              <Text bold title>
                {profile.name}
              </Text>
            </View>
            <View style={styles.containerIcon}>
              <TouchableOpacity onPress={onPressCart}>
                <AntIcon name="shoppingcart" size={30} />
              </TouchableOpacity>
              <TouchableOpacity onPress={onOrderHistory}>
                <FontAwesome name="history" size={30} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.containerTitle}>
            <TouchableOpacity
              onPress={() => {
                setIsAllProduct(true);
              }}>
              <Text
                color={isAllProduct ? COLORS.lightBack : COLORS.gray}
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
                color={!isAllProduct ? COLORS.lightBack : COLORS.gray}
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
  containerIcon: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 100,
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
  containerProduct: {
    marginHorizontal: 20,
  },
});

export default HomeScreen;
