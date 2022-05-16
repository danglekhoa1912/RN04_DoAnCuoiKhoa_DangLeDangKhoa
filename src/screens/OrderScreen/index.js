import {StyleSheet, View, FlatList, RefreshControl} from 'react-native';
import React, {useEffect, useState} from 'react';

import {BackgroundView, Text} from '../../components';
import CardOrder from './CardOrder';
import {useDispatch, useSelector} from 'react-redux';
import {requestProfileUser} from '../../redux/thunk/UserActionThunk';

const OrderScreen = ({route}) => {
  const [refreshing, setRefreshing] = useState(false);
  const token = route.params.token;
  const profile = useSelector(state => state.UserReducer.profile);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(requestProfileUser(token));
  }, []);

  const onRefresh = () => {
    dispatch(requestProfileUser(token)).then(() => {
      setRefreshing(false);
    });
  };

  return (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      style={{flex: 1}}>
      <BackgroundView style={styles.container}>
        <Text header bold>
          Order History
        </Text>
        <FlatList
          data={profile.ordersHistory}
          renderItem={({item}) => <CardOrder order={item} />}
          ItemSeparatorComponent={() => <View style={{height: 30}} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 100,
            marginTop: 20,
          }}
        />
      </BackgroundView>
    </RefreshControl>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
});
