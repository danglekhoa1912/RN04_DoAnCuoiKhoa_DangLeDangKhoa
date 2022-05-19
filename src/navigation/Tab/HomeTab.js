import {StyleSheet, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import {tabName} from '../../configs/NavigationContants';
import Screens from '../../screens';
import {COLORS} from '../../themes';

const BottomTab = createBottomTabNavigator();

const HomeTab = () => {
  const tabBarIcon = ({route: {name}, size, focused}) => {
    const icons = {
      HomeTab: 'home',
      FavouriteTab: 'favorite',
      ProfileTab: 'person',
      MapTab: 'map',
    };
    const color = focused ? COLORS.secondary : COLORS.lightBack;

    return (
      <View style={styles.tabBarIcon}>
        <MaterialIcon name={icons[name]} color={color} size={size} />
      </View>
    );
  };

  const screenOptions = ({route}) => ({
    headerShown: false,
    tabBarShowLabel: false,
    tabBarStyle: {
      position: 'absolute',
      bottom: 25,
      left: 10,
      right: 10,
      elevation: 0,
      borderColor: COLORS.primary,
      borderRadius: 25,
      height: 60,
    },
    tabBarIcon: params => tabBarIcon({...params, route}),
  });

  return (
    <BottomTab.Navigator screenOptions={screenOptions}>
      <BottomTab.Screen name={tabName.homeTab} component={Screens.HomeScreen} />
      <BottomTab.Screen
        name={tabName.favouriteTab}
        component={Screens.FavoriteScreen}
      />
      <BottomTab.Screen name={tabName.mapTab} component={Screens.MapScreen} />
      <BottomTab.Screen
        name={tabName.profileTab}
        component={Screens.ProfileScreen}
      />
    </BottomTab.Navigator>
  );
};

export default HomeTab;

const styles = StyleSheet.create({
  tabBarIcon: {
    width: '50%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
});
