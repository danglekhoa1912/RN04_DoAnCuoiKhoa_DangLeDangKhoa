import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Input} from '@ui-kitten/components';

import {BackgroundView, Text} from '../../components';
import {Facebook, Logo} from '../../assets';
import {COLORS} from '../../themes';
import {navigate} from '../../navigation/NavigationWithoutProp';
import {stackName} from '../../configs/NavigationContants';

const StartScreen = () => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);

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

  const navigateSignUp = () => {
    navigate(stackName.signupStack);
  };

  const renderIconLeft = name => (
    <Ionicons size={25} color={COLORS.primary} name={name} />
  );

  return (
    <BackgroundView style={styles.container}>
      <View style={styles.containerImage}>
        <Image source={Logo} style={styles.image} />
      </View>
      <View style={styles.containerTextInput}>
        <Input
          size="large"
          style={styles.input}
          placeholder="Email"
          accessoryLeft={() => renderIconLeft('mail')}
        />
        <Input
          size="large"
          style={styles.input}
          placeholder="Password"
          accessoryRight={renderIconSecure}
          secureTextEntry={secureTextEntry}
          accessoryLeft={() => renderIconLeft('lock-closed')}
        />
        <View style={styles.containerOption}>
          <TouchableOpacity onPress={navigateSignUp}>
            <Text bold>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text bold style={{color: 'black'}}>
              Forgot Password ?
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.containerButton}>
        <TouchableOpacity style={styles.button}>
          <Text bold>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.containerButtonFace}>
        <TouchableOpacity style={styles.buttonFace}>
          <Image style={{marginRight: 10}} source={Facebook} />
          <Text bold>Login With FaceBook</Text>
        </TouchableOpacity>
      </View>
    </BackgroundView>
  );
};

export default StartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  containerImage: {
    justifyContent: 'center',
    flex: 3,
  },
  image: {width: 200, height: 200},
  containerTextInput: {
    justifyContent: 'space-around',
    marginVertical: 20,
    flex: 1.5,
  },
  input: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: COLORS.white,
  },
  containerOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  containerButton: {
    width: '100%',
    flex: 0.5,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: COLORS.secondary,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 0,
  },
  containerButtonFace: {
    flex: 1,
    paddingTop: 20,
  },
  buttonFace: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
