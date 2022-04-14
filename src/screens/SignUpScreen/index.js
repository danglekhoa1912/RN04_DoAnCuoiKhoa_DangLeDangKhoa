import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Input, Radio, RadioGroup} from '@ui-kitten/components';

import {SignUp} from '../../assets';
import {BackgroundView, Text} from '../../components';
import {COLORS} from '../../themes';

const SignUpScreen = () => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIconSecure = () => (
    <TouchableOpacity>
      <Ionicons
        onPress={toggleSecureEntry}
        color={COLORS.primary}
        name={secureTextEntry ? 'eye-off' : 'eye'}
        size={25}
      />
    </TouchableOpacity>
  );

  const renderIconLeft = name => (
    <Ionicons size={25} color={COLORS.primary} name={name} />
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <BackgroundView style={styles.container}>
        <View style={styles.containerImage}>
          <Image source={SignUp} style={styles.image} />
        </View>
        <View style={styles.containerTextInput}>
          <Input
            size="large"
            style={styles.input}
            placeholder="Email"
            accessoryLeft={() => renderIconLeft('mail')}
            keyboardType="email-address"
          />
          <Input
            size="large"
            style={styles.input}
            placeholder="Password"
            accessoryRight={renderIconSecure}
            secureTextEntry={secureTextEntry}
            accessoryLeft={() => renderIconLeft('lock-closed')}
          />
          <Input
            size="large"
            style={styles.input}
            placeholder="Name"
            accessoryLeft={() => renderIconLeft('person')}
          />
          <Input
            size="large"
            style={styles.input}
            placeholder="Phone"
            accessoryLeft={() => renderIconLeft('call')}
            keyboardType="number-pad"
          />
          <View style={styles.containerRadioBox}>
            <Text bold>Gender</Text>
            <RadioGroup
              style={{flexDirection: 'row'}}
              selectedIndex={selectedIndex}
              onChange={index => setSelectedIndex(index)}>
              <Radio>Male</Radio>
              <Radio>Female</Radio>
            </RadioGroup>
          </View>
        </View>
        <View style={styles.containerButton}>
          <TouchableOpacity style={styles.button}>
            <Text bold>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </BackgroundView>
    </TouchableWithoutFeedback>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  containerImage: {
    justifyContent: 'center',
    marginVertical: 80,
    flex: 1,
  },
  image: {width: 240, height: 170},
  containerTextInput: {
    justifyContent: 'space-around',
    marginVertical: 20,
    flex: 3,
  },
  input: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: COLORS.white,
  },
  containerRadioBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerButton: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: COLORS.secondary,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 0,
  },
});
