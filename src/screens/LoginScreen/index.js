import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {useState} from 'react';
import * as Yup from 'yup';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Formik} from 'formik';
import {LoginButton, AccessToken} from 'react-native-fbsdk-next';

import {BackgroundView, Text} from '../../components';
import {Logo} from '../../assets';
import {COLORS} from '../../themes';
import {navigate} from '../../navigation/NavigationWithoutProp';
import {stackName} from '../../configs/NavigationContants';
import TextInput from '../../components/TextInput';
import {Spinner} from '@ui-kitten/components';
import {useDispatch} from 'react-redux';
import {
  loginWithFacebook,
  requestLoginUser,
} from '../../redux/thunk/UserActionThunk';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Không được bỏ trống')
    .email('Email không hợp lệ'),
  password: Yup.string().required('Không được bỏ trống'),
});

const LoginScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const dispatch = useDispatch();

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  useEffect(() => {
    return () => {
      setIsLoading(false);
    };
  });

  const renderIconSecure = () => (
    <TouchableOpacity>
      <Ionicons
        onPress={toggleSecureEntry}
        color={COLORS.secondary}
        name={secureTextEntry ? 'eye-off' : 'eye'}
        size={25}
      />
    </TouchableOpacity>
  );

  const navigateSignUp = () => {
    navigate(stackName.signupStack);
  };

  const renderIconLeft = name => (
    <Ionicons size={25} color={COLORS.secondary} name={name} />
  );

  const handleSubmit = ({email, password}) => {
    setIsLoading(true);
    dispatch(requestLoginUser(email, password)).then(() => {
      setIsLoading(false);
    });
  };

  return (
    <BackgroundView style={styles.container}>
      <View style={styles.containerImage}>
        <Image source={Logo} style={styles.image} />
      </View>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}>
        {({
          errors,
          values,
          touched,
          handleChange,
          handleSubmit,
          handleBlur,
        }) => {
          return (
            <View style={styles.loginForm}>
              <TextInput
                size="large"
                placeholder="Email"
                accessoryLeft={() => renderIconLeft('mail')}
                keyboardType="email-address"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                errorMsg={errors.email}
                touched={touched.email}
              />
              <TextInput
                size="large"
                placeholder="Password"
                accessoryRight={renderIconSecure}
                secureTextEntry={secureTextEntry}
                accessoryLeft={() => renderIconLeft('lock-closed')}
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                errorMsg={errors.password}
                touched={touched.password}
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
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                {isLoading ? <Spinner /> : <Text bold>Login</Text>}
              </TouchableOpacity>
              <LoginButton
                style={styles.buttonFace}
                onLoginFinished={(error, result) => {
                  if (error) {
                    console.log('login has error: ' + result.error);
                  } else if (result.isCancelled) {
                    console.log('login is cancelled');
                  } else {
                    AccessToken.getCurrentAccessToken().then(data => {
                      dispatch(loginWithFacebook(data.accessToken));
                    });
                  }
                }}
              />
            </View>
          );
        }}
      </Formik>
    </BackgroundView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerImage: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  image: {width: 200, height: 200},
  loginForm: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    marginBottom: 120,
  },

  containerOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  button: {
    backgroundColor: COLORS.secondary,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 0,
  },
  buttonFace: {
    height: 40,
  },
});
