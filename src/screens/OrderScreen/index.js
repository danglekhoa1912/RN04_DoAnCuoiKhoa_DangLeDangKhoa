import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';

import {BackgroundView, Text} from '../../components';
import CardOrder from './CardOrder';
import {requestProfileUser} from '../../redux/thunk/UserActionThunk';
import {goBack} from '../../navigation/NavigationWithoutProp';
import {COLORS} from '../../themes';

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
      {profile.ordersHistory.length > 0 ? (
        <BackgroundView style={styles.container}>
          <Text header bold style={styles.containerHeader}>
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
      ) : (
        <BackgroundView
          style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text>OOP! You don't have any orders yet</Text>
        </BackgroundView>
      )}
      <TouchableOpacity onPress={goBack} style={styles.containerButtonBack}>
        <Ionicons
          name="ios-chevron-back-circle-sharp"
          size={45}
          color={COLORS.secondary}
        />
      </TouchableOpacity>
    </RefreshControl>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  containerButtonBack: {
    position: 'absolute',
    top: 15,
    left: 15,
  },
  containerHeader: {
    textAlign: 'center',
    marginTop: 10,
  },
});
