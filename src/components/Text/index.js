import {Text as RNText, StyleSheet} from 'react-native';
import React, {Component} from 'react';
import {COLORS} from '../../themes';

export default class Text extends Component {
  render() {
    const {color, style, children, header, title, subText, bold} = this.props;
    return (
      <RNText
        style={[
          {color: color ? color : 'white'},
          header && styles.header,
          bold && styles.bold,
          title && styles.title,
          subText && styles.subText,
          style,
        ]}>
        {children}
      </RNText>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    fontSize: 35,
  },
  title: {
    fontSize: 22,
  },
  subText: {
    opacity: 0.7,
  },
  bold: {
    fontWeight: 'bold',
  },
});
