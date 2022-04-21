import {Dimensions} from 'react-native';

const {height: sHeight, width: sWidth} = Dimensions.get('window');

const replaceEndLine = source => {
  const newState = {...source};
  newState.description = source.description.replace('\r\n', '');
  newState.shortDescription = source.shortDescription.replace('\r\n', '');
  return newState;
};

export {sHeight, sWidth, replaceEndLine};
