import {StyleSheet, Image, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Radio, RadioGroup, Spinner} from '@ui-kitten/components';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Toast from 'react-native-simple-toast';

import {SignUp} from '../../assets';
import {BackgroundView, Text} from '../../components';
import {COLORS} from '../../themes';
import TextInput from '../../components/TextInput';
import {stackName} from '../../configs/NavigationContants';
import {goBack} from '../../navigation/NavigationWithoutProp';
import axios from 'axios';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Không được bỏ trống')
    .email('Email không hợp lệ'),
  password: Yup.string()
    .required('Không được bỏ trống')
    .min(8, ({min}) => `Password phải có ít nhất ${min} kí tự`),
  name: Yup.string().required('Không được bỏ trống'),
  phone: Yup.string()
    .required('Không được bỏ trống')
    .min(10, ({min}) => `Phone number phải có đủ ${min} kí tự`),
});

const SignUpScreen = () => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

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

  const renderIconLeft = name => (
    <Ionicons size={25} color={COLORS.secondary} name={name} />
  );

  // const handleSubmit = ({email, password, name, phone, gender}) => {
  //   dispatch(requestSignupUser(new User(email, password, phone, name, gender)));
  //   if (isSignup.isSuccess) {
  //     Toast.show(isSignup.message, Toast.LONG);
  //     navigate(stackName.loginStack);
  //   } else {
  //     Toast.show('Email đã được sử dụng', Toast.LONG);
  //   }
  // };

  const handleSubmit = async ({email, password, name, phone, gender}) => {
    setIsLoading(true);
    try {
      const response = await axios({
        method: 'POST',
        url: 'http://svcy3.myclass.vn/api/Users/signup',
        data: {
          email: email,
          password: password,
          name: name,
          phone: phone,
          gender: gender,
        },
      });
      Toast.show('Đăng ký tài khoản thành công!', Toast.LONG);
      setIsLoading(false);
      goBack(stackName.loginStack);
    } catch (e) {
      if (e.message.includes('400'))
        Toast.show('Email đã được sử dụng!', Toast.LONG);
      setIsLoading(false);
    }
  };

  return (
    <BackgroundView style={styles.container}>
      <View style={styles.containerImage}>
        <Image source={SignUp} style={styles.image} />
      </View>
      <Formik
        initialValues={{
          email: '',
          password: '',
          name: '',
          phone: '',
          gender: 0,
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}>
        {({
          errors,
          values,
          touched,
          handleChange,
          handleSubmit,
          setFieldValue,
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
              <TextInput
                size="large"
                placeholder="Name"
                accessoryLeft={() => renderIconLeft('person')}
                value={values.name}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                errorMsg={errors.name}
                touched={touched.name}
              />
              <TextInput
                size="large"
                placeholder="Phone"
                accessoryLeft={() => renderIconLeft('call')}
                keyboardType="number-pad"
                value={values.phone}
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                errorMsg={errors.phone}
                touched={touched.phone}
              />
              <View style={styles.containerRadioBox}>
                <Text bold>Gender</Text>
                <RadioGroup
                  style={{flexDirection: 'row'}}
                  selectedIndex={values.gender}
                  onChange={index => {
                    setFieldValue('gender', index);
                  }}>
                  <Radio>Male</Radio>
                  <Radio>Female</Radio>
                </RadioGroup>
              </View>
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                {isLoading ? (
                  <Spinner />
                ) : (
                  <Text bold style={styles.buttonText}>
                    Submit
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          );
        }}
      </Formik>
    </BackgroundView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerImage: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  image: {width: 240, height: 170},

  containerRadioBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  loginForm: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    marginBottom: 120,
  },
  button: {
    backgroundColor: COLORS.secondary,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
  },
});
