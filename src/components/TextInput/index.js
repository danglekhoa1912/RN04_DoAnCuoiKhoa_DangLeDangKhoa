import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {Input} from '@ui-kitten/components';

export default class TextInput extends Component {
  state = {
    secureTextEntry: this.props.secureTextEntry,
  };

  render() {
    const {errorMsg, touched} = this.props;

    const isShowError = !!errorMsg && touched;
    return (
      <View style={styles.wrapperTextInput}>
        <View>
          <Input
            {...this.props}
            style={[
              styles.textInputContainer,
              isShowError && styles.errorBackground,
            ]}
          />
        </View>
        {isShowError && <Text style={styles.errorText}>* {errorMsg}</Text>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapperTextInput: {
    marginBottom: 10,
  },
  textInputContainer: {
    backgroundColor: '#F3F0EE',
    height: 50,
    borderRadius: 8,
  },
  textInputTitle: {
    color: '#bbb',
    position: 'absolute',
  },
  errorBackground: {backgroundColor: '#f9c8c8'},
  errorText: {color: 'red'},
});
