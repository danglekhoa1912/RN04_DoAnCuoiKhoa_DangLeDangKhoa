import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';

import {Avatar} from '../../assets';
import {BackgroundView, Text} from '../../components';
import {requestProfileUser} from '../../redux/thunk/UserActionThunk';
import {COLORS} from '../../themes';
import {stackName} from '../../configs/NavigationContants';
import {navigate, replace} from '../../navigation/NavigationWithoutProp';
import {logoutUser} from '../../redux/actions/UserAction';
import {LoginManager} from 'react-native-fbsdk-next';

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

const ProfileScreen = () => {
  const profile = useSelector(state => state.UserReducer.profile);
  const token = useSelector(state => state.UserReducer.token);
  const [refreshing, setRefreshing] = useState(false);

  const avatar = profile.avatar ? {uri: profile.avatar} : {Avatar};

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(requestProfileUser(token));
  }, []);

  const onLogOut = () => {
    if (profile.facebookId != '') LoginManager.logOut();
    logoutUser();
    replace(stackName.loginStack);
  };

  const onEditProfile = () => {
    navigate(stackName.editProfileStack);
  };

  const onOrderHistory = () => {
    navigate(stackName.orderScreen, {token});
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
            <TouchableOpacity onPress={onChangePassword} style={styles.button}>
              <Text>Change Password</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={onOrderHistory} style={styles.button}>
            <Text>Order History</Text>
          </TouchableOpacity>
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
    </RefreshControl>
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
