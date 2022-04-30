import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';

import {Avatar} from '../../assets';
import {BackgroundView, Text} from '../../components';
import {requestProfileUser} from '../../redux/thunk/UserActionThunk';
import {COLORS} from '../../themes';
import {stackName} from '../../configs/NavigationContants';

const RenderInfor = ({title, infor}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <Text title style={{marginBottom: 5, paddingRight: 20}}>
        {title}:
      </Text>
      <Text title>{infor}</Text>
    </View>
  );
};

const ProfileScreen = ({navigation}) => {
  const profile = useSelector(state => state.UserReducer.profile);
  const token = useSelector(state => state.UserReducer.token);

  const avatar = profile.avatar ? {uri: profile.avatar} : {Avatar};

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(requestProfileUser(token));
  }, []);

  const onLogOut = navigate => {
    navigation.replace(stackName.loginStack);
  };

  const onEditProfile = () => {};

  return (
    <BackgroundView style={styles.container}>
      <View style={styles.containerHeader}>
        <Text header>My Profile</Text>
      </View>
      <View style={styles.containerProfile}>
        <TouchableOpacity style={styles.containerAvatar}>
          <Image style={styles.avatar} source={avatar} />
          <View style={styles.icon}>
            <AntDesign color={COLORS.white} size={15} name="edit" />
          </View>
        </TouchableOpacity>
        <Text bold style={{fontSize: 35}}>
          {profile.name}
        </Text>
      </View>
      <View style={styles.containerInput}>
        <RenderInfor infor={profile.email} title="Email" />
        <RenderInfor infor={profile.name} title="Name" />
        <RenderInfor infor={profile.phone} title="Phone" />
        <RenderInfor
          infor={profile.gender ? 'Female' : 'Male'}
          title="Gender"
        />

        <View style={styles.containerButton}>
          <TouchableOpacity onPress={onEditProfile} style={styles.button}>
            <Text>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text>Change Password</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={onLogOut}
          style={[styles.button, styles.logout]}>
          <AntDesign color={COLORS.white} size={20} name="logout" />
          <Text title color={COLORS.white}>
            Log Out
          </Text>
        </TouchableOpacity>
      </View>
    </BackgroundView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  containerHeader: {
    alignItems: 'center',
  },
  containerProfile: {
    alignItems: 'center',
    marginTop: 20,
  },
  containerAvatar: {},
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
    marginTop: 20,
  },
  containerButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20,
  },
  logout: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 200,
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
