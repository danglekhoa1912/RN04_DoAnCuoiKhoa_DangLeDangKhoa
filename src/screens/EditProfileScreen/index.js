import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {Radio, RadioGroup, Spinner} from '@ui-kitten/components';
import * as Yup from 'yup';
import {Formik} from 'formik';

import {Avatar} from '../../assets';
import {BackgroundView, Text} from '../../components';
import {
  requestEditProfile,
  requestProfileUser,
} from '../../redux/thunk/UserActionThunk';
import {COLORS} from '../../themes';
import TextInput from '../../components/TextInput';
import {goBack} from '../../navigation/NavigationWithoutProp';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Không được bỏ trống')
    .email('Email không hợp lệ'),
  name: Yup.string().required('Không được bỏ trống'),
  phone: Yup.string()
    .required('Không được bỏ trống')
    .min(10, ({min}) => `Phone number phải có đủ ${min} kí tự`),
});

const RenderInfor = ({
  title,
  value,
  handleChange,
  handleBlur,
  errors,
  touched,
}) => {
  return (
    <View>
      <Text title style={{marginBottom: 5, paddingRight: 20}}>
        {title}:
      </Text>
      <TextInput
        onChangeText={handleChange}
        onBlur={handleBlur}
        errorMsg={errors}
        touched={touched}
        size="large"
        value={value}
      />
    </View>
  );
};

const EditProfileScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const profile = useSelector(state => state.UserReducer.profile);
  const token = useSelector(state => state.UserReducer.token);

  const avatar = profile.avatar ? {uri: profile.avatar} : {Avatar};

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(requestProfileUser(token));
  }, []);

  const handleSubmit = ({email, name, phone, gender}) => {
    setIsLoading(true);
    dispatch(requestEditProfile(email, name, gender, phone, token)).then(() => {
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
      <View style={styles.containerHeader}>
        <Text header>Edit Profile</Text>
      </View>
      <View style={styles.containerProfile}>
        <TouchableOpacity style={styles.containerAvatar}>
          <Image style={styles.avatar} source={avatar} />
          <View style={styles.icon}>
            <AntDesign color={COLORS.white} size={15} name="edit" />
          </View>
        </TouchableOpacity>
      </View>
      <Formik
        initialValues={{
          email: profile.email,
          name: profile.name,
          phone: profile.phone,
          gender: +profile.gender,
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
            <View style={styles.containerInput}>
              <RenderInfor
                touched={touched.email}
                errors={errors.email}
                handleBlur={handleBlur('email')}
                handleChange={handleChange('email')}
                value={values.email}
                title="Email"
              />
              <RenderInfor
                touched={touched.name}
                errors={errors.name}
                handleBlur={handleBlur('name')}
                handleChange={handleChange('name')}
                value={values.name}
                title="Name"
              />
              <RenderInfor
                touched={touched.phone}
                errors={errors.phone}
                handleBlur={handleBlur('phone')}
                handleChange={handleChange('phone')}
                value={values.phone}
                title="Phone"
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

              <View style={styles.containerButton}>
                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                  {isLoading ? <Spinner /> : <Text>Save</Text>}
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      </Formik>
    </BackgroundView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  containerButtonBack: {
    position: 'absolute',
    top: 15,
    left: 15,
  },
  containerHeader: {
    alignItems: 'center',
  },
  containerProfile: {
    alignItems: 'center',
    marginTop: 20,
    flex: 1,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  icon: {
    position: 'absolute',
    backgroundColor: COLORS.secondary,
    borderRadius: 50,
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 5,
    right: 0,
  },
  containerInput: {
    flex: 1,
    marginBottom: 250,
  },
  containerRadioBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerButton: {
    paddingTop: 20,
    marginHorizontal: 50,
  },
  button: {
    backgroundColor: COLORS.secondary,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 0,
    paddingHorizontal: 25,
  },
});
