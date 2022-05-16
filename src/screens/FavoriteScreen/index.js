import {StyleSheet, View, FlatList, RefreshControl} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {requestProductFavorites} from '../../redux/thunk/UserActionThunk';
import {BackgroundView, Text} from '../../components';
import CardItemFavorite from './CardItemFavorite';

const FavoriteScreen = () => {
  const [refreshing, setRefreshing] = useState(false);

  const token = useSelector(state => state.UserReducer.token);
  const listProductFavorites = useSelector(
    state => state.UserReducer.listProductFavorites,
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(requestProductFavorites(token));
  }, []);

  const onRefresh = () => {
    dispatch(requestProductFavorites(token)).then(() => {
      setRefreshing(false);
    });
  };

  return (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      style={{flex: 1}}>
      <BackgroundView style={styles.container}>
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}>
          <View style={styles.containerHeader}>
            <Text header bold>
              Favorites
            </Text>
          </View>
          {listProductFavorites.length > 0 ? (
            <FlatList
              data={listProductFavorites}
              renderItem={({item}) => <CardItemFavorite product={item} />}
              ItemSeparatorComponent={() => <View style={{height: 30}} />}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: 100,
              }}
            />
          ) : (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text bold>opps bạn chưa có sản phẩm yêu thích nào!</Text>
            </View>
          )}
        </RefreshControl>
      </BackgroundView>
    </RefreshControl>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  containerHeader: {
    marginVertical: 10,
  },
});
