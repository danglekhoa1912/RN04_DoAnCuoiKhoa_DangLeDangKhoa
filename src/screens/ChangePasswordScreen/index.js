import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Yup from 'yup';
import {Formik} from 'formik';

import {BackgroundView, Text} from '../../components';
import {goBack} from '../../navigation/NavigationWithoutProp';
import {COLORS} from '../../themes';
import TextInput from '../../components/TextInput';
import {useDispatch, useSelector} from 'react-redux';
import {requestChangePassword} from '../../redux/thunk/UserActionThunk';
import {Spinner} from '@ui-kitten/components';

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required('Password is required')
    .min(8, ({min}) => `Password must be at least ${min} characters`),
  rePassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match',
  ),
});

const ChangePasswordScreen = () => {
  const [secureTextEntryNewPass, setSecureTextEntryNewPass] = useState(true);
  const [secureTextEntryReNewPass, setSecureTextEntryReNewPass] =
    useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector(state => state.UserReducer.token);

  const dispatch = useDispatch();

  const toggleSecureEntryNewPass = () => {
    setSecureTextEntryNewPass(!secureTextEntryNewPass);
  };

  const toggleSecureEntryReNewPass = () => {
    setSecureTextEntryReNewPass(!secureTextEntryReNewPass);
  };

  const renderIconSecure = (toggleSecureEntry, secureTextEntry) => (
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

  const handleSubmit = ({password}) => {
    setIsLoading(true);
    dispatch(requestChangePassword(password, token)).then(() => {
      setIsLoading(false);
      goBack();
    });
  };

  return (
    <BackgroundView style={styles.container}>
      <TouchableOpacity onPress={goBack} style={styles.containerButtonBack}>
        <Ionicons
          name="ios-chevron-back-circle-sharp"
          size={45}
          color={COLORS.secondary}
        />
      </TouchableOpacity>
      <Text title bold>
        Change Password
      </Text>
      <Formik
        initialValues={{
          password: '',
          rePassword: '',
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
              <View>
                <Text content style={styles.title}>
                  New Password
                </Text>
                <TextInput
                  size="large"
                  placeholder="New Password"
                  accessoryRight={() =>
                    renderIconSecure(
                      toggleSecureEntryNewPass,
                      secureTextEntryNewPass,
                    )
                  }
                  secureTextEntry={secureTextEntryNewPass}
                  accessoryLeft={() => renderIconLeft('lock-closed')}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  errorMsg={errors.password}
                  touched={touched.password}
                />
              </View>
              <View>
                <Text content style={styles.title}>
                  Confirm New Password
                </Text>
                <TextInput
                  size="large"
                  placeholder="Confirm New Password"
                  accessoryRight={() =>
                    renderIconSecure(
                      toggleSecureEntryReNewPass,
                      secureTextEntryReNewPass,
                    )
                  }
                  secureTextEntry={secureTextEntryReNewPass}
                  accessoryLeft={() => renderIconLeft('lock-closed')}
                  value={values.rePassword}
                  onChangeText={handleChange('rePassword')}
                  onBlur={handleBlur('rePassword')}
                  errorMsg={errors.rePassword}
                  touched={touched.rePassword}
                />
              </View>
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                {isLoading ? <Spinner /> : <Text bold>Change Password</Text>}
              </TouchableOpacity>
            </View>
          );
        }}
      </Formik>
    </BackgroundView>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  containerButtonBack: {
    marginTop: 15,
  },
  button: {
    backgroundColor: COLORS.secondary,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 0,
  },
  loginForm: {
    justifyContent: 'space-between',
    marginTop: 50,
    height: 280,
  },
  title: {
    marginBottom: 5,
  },
});
