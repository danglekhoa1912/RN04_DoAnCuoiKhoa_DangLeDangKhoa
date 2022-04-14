import {createNavigationContainerRef} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

const NavigationWithoutProp = {
  navigate: (screenName, param) => {
    if (navigationRef.isReady()) {
      navigationRef.navigate(screenName, param);
    }
  },
  goBack: () => {
    if (navigationRef.isReady()) {
      navigationRef.goBack();
    }
  },
};

export const navigate = NavigationWithoutProp.navigate;
export const goBack = NavigationWithoutProp.goBack;
