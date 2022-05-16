import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {BackgroundView} from '../../components';
import {COLORS} from '../../themes';
import {goBack} from '../../navigation/NavigationWithoutProp';

const DetailMapScreen = props => {
  const store = props.route.params;

  const onPressBack = () => {
    goBack();
  };

  return (
    <BackgroundView>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{
          flex: 1,
        }}
        initialRegion={{
          latitude: Number(store.latitude),
          longitude: Number(store.longtitude),
          latitudeDelta: 0.0122,
          longitudeDelta: 0.00421,
        }}
        zoomControlEnabled
        loadingEnabled>
        <Marker
          coordinate={{
            latitude: Number(store.latitude),
            longitude: Number(store.longtitude),
          }}
          title={store.name}
          description={store.description}
        />
      </MapView>
      <TouchableOpacity style={styles.buttonBack} onPress={onPressBack}>
        <Ionicons
          name="ios-chevron-back-circle-sharp"
          size={50}
          color={COLORS.secondary}
        />
      </TouchableOpacity>
    </BackgroundView>
  );
};

export default DetailMapScreen;

const styles = StyleSheet.create({
  buttonBack: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
});
