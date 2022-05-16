import {StyleSheet, View, FlatList} from 'react-native';
import React, {useEffect} from 'react';

import {BackgroundView, Text} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {requestStore} from '../../redux/thunk/ProductActionThunk';
import CardMap from './CardMap';

const MapScreen = () => {
  const listStore = useSelector(state => state.ProductReducer.listStore);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestStore());
  }, []);

  return (
    <BackgroundView style={styles.container}>
      <Text header bold>
        Stores
      </Text>
      <FlatList
        data={listStore}
        renderItem={({item}) => <CardMap store={item} />}
        ItemSeparatorComponent={() => <View style={{height: 30}} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      />
    </BackgroundView>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});
