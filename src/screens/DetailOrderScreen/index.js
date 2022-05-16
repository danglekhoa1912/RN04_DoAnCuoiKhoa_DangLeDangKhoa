import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {BackgroundView} from '../../components';

const DetailOrderScreen = ({route}) => {
  const order = route.params.order;

  return <BackgroundView></BackgroundView>;
};

export default DetailOrderScreen;

const styles = StyleSheet.create({});
