import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {
  Layout,
  Menu,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Spinner,
} from '@ui-kitten/components';
import {LoginManager} from 'react-native-fbsdk-next';

import {Avatar} from '../../assets';
import {BackgroundView, Text} from '../../components';
import {
  requestEditProfile,
  requestProfileUser,
} from '../../redux/thunk/UserActionThunk';
import {COLORS} from '../../themes';
import {stackName} from '../../configs/NavigationContants';
import {navigate, replace} from '../../navigation/NavigationWithoutProp';
import {sWidth} from '../../utils';
import TextInput from '../../components/TextInput';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Không được bỏ trống'),
  phone: Yup.string()
    .required('Không được bỏ trống')
    .min(10, ({min}) => `Phone number phải có đủ ${min} kí tự`),
});

const ProfileScreen = () => {
  const profile = useSelector(state => state.UserReducer.profile);
  const token = useSelector(state => state.UserReducer.token);
  const [refreshing, setRefreshing] = useState(false);
  const [modalGenderVisible, setModalGenderVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [title, setTitle] = useState('');
  const [tempValue, setTempValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const avatar = profile.avatar ? {uri: profile.avatar} : {Avatar};
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(requestProfileUser(token));
  }, []);

  const handleSubmit = ({email, name, phone, gender}) => {
    setIsLoading(true);
    dispatch(requestEditProfile(email, name, gender, phone, token)).then(() => {
      setIsLoading(false);
      setModalGenderVisible(false);
    });
  };

  const ForwardIcon = (title, isChange) => (
    <View style={{flexDirection: 'row'}}>
      <Text>{title}</Text>
      {isChange ? <Entypo name="chevron-thin-right" size={20} /> : <></>}
    </View>
  );

  const ForwardIconGender = gender => (
    <View>
      <View style={{flexDirection: 'row'}}>
        <Text>{gender ? 'Female' : 'Male'}</Text>
        <Entypo name="chevron-thin-right" size={20} />
      </View>
    </View>
  );

  const ChangeGender = (
    values,
    handleSubmit,
    errors,
    touched,
    handleBlur,
    index,
    title,
  ) => {
    return (
      <Modal
        animationType="slide"
        backdropStyle={styles.backdrop}
        transparent={true}
        visible={modalGenderVisible}
        onBackdropPress={() => setModalGenderVisible(false)}>
        <View style={styles.containarModal}>
          <View style={{alignItems: 'center'}}>
            <Text title bold>
              {title}
            </Text>
            {index === 3 ? (
              <RadioGroup
                style={{flexDirection: 'row'}}
                selectedIndex={tempValue}
                onChange={index => {
                  setTempValue(index);
                }}>
                <Radio>Male</Radio>
                <Radio>Female</Radio>
              </RadioGroup>
            ) : (
              <View style={styles.containerInput}>
                <TextInput
                  size="large"
                  value={tempValue}
                  onChangeText={value => setTempValue(value)}
                  onBlur={handleBlur(title)}
                  errorMsg={errors[title]}
                  touched={touched[title]}
                />
              </View>
            )}
          </View>
          <TouchableOpacity
            style={styles.buttonSave}
            onPress={() => {
              values[title] = tempValue;
              handleSubmit(values);
            }}>
            {isLoading ? <Spinner /> : <Text>Save</Text>}
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  const onLogOut = () => {
    if (profile.facebookId != '') LoginManager.logOut();
    replace(stackName.loginStack);
  };

  const onChangePassword = () => {
    navigate(stackName.changePasswordScreen, {});
  };

  const onRefresh = () => {
    dispatch(requestProfileUser(token)).then(() => {
      setRefreshing(false);
    });
  };
  return (
    <RefreshControl
      style={{flex: 1}}
      refreshing={refreshing}
      onRefresh={onRefresh}>
      <BackgroundView style={styles.container}>
        <View style={styles.containerHeader}>
          <Text header>My Profile</Text>
        </View>
        <View style={styles.containerProfile}>
          <View style={styles.containerAvatar}>
            <Image style={styles.avatar} source={avatar} />
          </View>
        </View>
        <Formik
          initialValues={{
            email: profile.email,
            name: profile.name,
            phone: profile.phone,
            gender: Number(profile.gender),
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}>
          {({errors, values, touched, handleSubmit, handleBlur}) => {
            return (
              <Layout style={styles.containerMenu}>
                <Menu
                  style={styles.menu}
                  onSelect={index => setSelectedIndex(index)}>
                  <MenuItem
                    title="Name"
                    onPress={() => {
                      setTempValue(values.name);
                      setTitle('name');
                      setModalGenderVisible(true);
                    }}
                    accessoryRight={() => ForwardIcon(values.name, true)}
                  />
                  <MenuItem
                    title="Email"
                    accessoryRight={() => ForwardIcon(values.email, false)}
                  />
                  <MenuItem
                    onPress={() => {
                      setTempValue(values.phone);
                      setTitle('phone');
                      setModalGenderVisible(true);
                    }}
                    title="Phone"
                    accessoryRight={() => ForwardIcon(values.phone, true)}
                  />
                  <MenuItem
                    onPress={() => {
                      setTempValue(values.gender);
                      setTitle('gender');
                      setModalGenderVisible(true);
                    }}
                    title="Gender"
                    accessoryRight={() => ForwardIconGender(values.gender)}
                  />
                  <MenuItem
                    onPress={onChangePassword}
                    title="Change password"
                    accessoryRight={() => ForwardIcon('', true)}
                    disabled={profile.facebookId != '' ? true : false}
                  />
                </Menu>
                {ChangeGender(
                  values,
                  handleSubmit,
                  errors,
                  touched,
                  handleBlur,
                  selectedIndex.row,
                  title,
                )}
              </Layout>
            );
          }}
        </Formik>

        <TouchableOpacity onPress={onLogOut} style={styles.button}>
          <AntDesign color={COLORS.white} size={20} name="logout" />
          <Text title color={COLORS.white}>
            Log Out
          </Text>
        </TouchableOpacity>
      </BackgroundView>
    </RefreshControl>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerHeader: {
    alignItems: 'center',
  },
  containerProfile: {
    alignItems: 'center',
    marginVertical: 20,
  },
  containerAvatar: {},
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  button: {
    backgroundColor: COLORS.secondary,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 50,
    marginHorizontal: 80,
    marginTop: 20,
  },
  containerMenu: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  menu: {
    flex: 1,
    margin: 8,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  containarModal: {
    width: sWidth - 40,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  buttonSave: {
    backgroundColor: COLORS.secondary,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 0,
    paddingHorizontal: 25,
    marginTop: 10,
  },
  containerInput: {
    width: sWidth - 70,
  },
});
