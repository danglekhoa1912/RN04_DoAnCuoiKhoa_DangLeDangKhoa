import {StyleSheet} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {stackName} from '../configs/NavigationContants';
import Screens from '../screens';
import HomeTab from './Tab/HomeTab';

const Stack = createNativeStackNavigator();

const RoorNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={stackName.homeStack} component={HomeTab} />
      <Stack.Screen
        name={stackName.loginStack}
        component={Screens.LoginScreen}
      />
      <Stack.Screen
        name={stackName.signupStack}
        component={Screens.SignUpScreen}
      />
      <Stack.Screen
        name={stackName.detailStack}
        component={Screens.DetailScreen}
      />
    </Stack.Navigator>
  );
};

export default RoorNavigation;

const styles = StyleSheet.create({});
