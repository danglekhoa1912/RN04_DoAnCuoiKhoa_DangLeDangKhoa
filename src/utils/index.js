import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dimensions} from 'react-native';

const {height: sHeight, width: sWidth} = Dimensions.get('window');

const replaceEndLine = source => {
  const newState = {...source};
  newState.description = source.description.replace('\r\n', '');
  newState.shortDescription = source.shortDescription.replace('\r\n', '');
  return newState;
};

const getData = async key => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.log(e);
  }
};

const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(e);
  }
};

export {sHeight, sWidth, replaceEndLine, getData, storeData};
