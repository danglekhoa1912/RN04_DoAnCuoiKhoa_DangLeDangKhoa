/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import RoorNavigation from './src/navigation/RoorNavigation';
import store from './src/redux/roorStore';
import {ApplicationProvider} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import SplashScreen from 'react-native-splash-screen';

import {navigationRef} from './src/navigation/NavigationWithoutProp';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer ref={navigationRef}>
          <RoorNavigation />
        </NavigationContainer>
      </ApplicationProvider>
    </Provider>
  );
};

export default App;
