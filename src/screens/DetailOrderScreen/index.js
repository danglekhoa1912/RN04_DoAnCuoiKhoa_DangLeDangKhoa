import {StyleSheet, View, TouchableOpacity, FlatList} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';

import {BackgroundView, Text} from '../../components';
import CardDetailOrder from './CardDetailOrder';
import {COLORS} from '../../themes';
import {goBack} from '../../navigation/NavigationWithoutProp';
import {requestRemoveOrder} from '../../redux/thunk/UserActionThunk';

const DetailOrderScreen = ({route}) => {
  const order = route.params.order;
  const token = useSelector(state => state.UserReducer.token);

  const dispatch = useDispatch();

  const onCancelOrder = () => {
    dispatch(requestRemoveOrder(token, order.id));
    goBack();
  };

  return (
    <BackgroundView style={styles.container}>
      <Text header bold style={styles.containerHeader}>
        #{order.id}
      </Text>
      <FlatList
        data={order.orderDetail}
        renderItem={({item}) => <CardDetailOrder product={item} />}
        ItemSeparatorComponent={() => <View style={{height: 30}} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 20,
        }}
      />
      <View style={styles.containerButton}>
        <TouchableOpacity onPress={onCancelOrder} style={styles.button}>
          <Text bold content style={styles.text}>
            Cancel order
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={goBack} style={styles.containerButtonBack}>
        <Ionicons
          name="ios-chevron-back-circle-sharp"
          size={45}
          color={COLORS.secondary}
        />
      </TouchableOpacity>
    </BackgroundView>
  );
};

export default DetailOrderScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  containerHeader: {
    textAlign: 'center',
    marginTop: 10,
  },
  containerButton: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  button: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: COLORS.lightRed,
    paddingVertical: 5,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  text: {
    color: COLORS.lightRed,
  },
  containerButtonBack: {
    position: 'absolute',
    top: 15,
    left: 15,
  },
});
