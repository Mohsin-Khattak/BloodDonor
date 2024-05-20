import {PrimaryButton} from 'components/atoms/buttons';
import {Row} from 'components/atoms/row';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {useAppSelector} from 'hooks/use-store';
import React from 'react';
import {Image, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch} from 'react-redux';
import {onLogoutPress} from 'services/firebase/firebase-actions';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import AppHeader from '../../../components/atoms/headers/index';
import styles from './styles';

const Profile = props => {
  const dispatch = useDispatch();
  const {userInfo} = useAppSelector(s => s.user);

  return (
    <View style={styles.container}>
      <AppHeader title="Profile" />
      <View style={{paddingHorizontal: mvs(20)}}>
        <Image
          source={{
            uri:
              userInfo?.image ||
              'https://t3.ftcdn.net/jpg/01/18/01/98/360_F_118019822_6CKXP6rXmVhDOzbXZlLqEM2ya4HhYzSV.jpg',
          }}
          style={styles.profileImage}
        />
        <Medium
          label={userInfo?.name || 'N/A'}
          style={{
            color: colors.primary,
            fontSize: mvs(16),
            textAlign: 'center',
            marginTop: mvs(20),
          }}
        />
        <Row style={styles.inputContainer}>
          <Fontisto name={'email'} size={mvs(25)} color={colors.primary} />
          <Regular
            style={{marginLeft: mvs(10), color: colors.primary}}
            label={userInfo?.email || 'N/A'}
          />
        </Row>
        <Row style={styles.inputContainer}>
          <Entypo name={'location'} size={mvs(25)} color={colors.primary} />
          <Regular
            style={{marginLeft: mvs(10), color: colors.primary}}
            label={userInfo?.address?.address || 'N/A'}
          />
        </Row>
        <Row style={styles.inputContainer}>
          <Feather name={'phone'} size={mvs(25)} color={colors.primary} />
          <Regular
            style={{marginLeft: mvs(10), color: colors.primary}}
            label={userInfo?.phone || 'N/A'}
          />
        </Row>
        {/* <Row style={styles.inputContainer}>
          <MaterialIcons
            name={'bloodtype'}
            size={mvs(25)}
            color={colors.primary}
          />
          <Regular
            style={{marginLeft: mvs(10), color: colors.primary}}
            label={userInfo?.bloodGroup || 'N/A'}
          />
        </Row> */}
        <PrimaryButton
          onPress={() => props?.navigation?.navigate('EditProfile')}
          containerStyle={{marginTop: mvs(100)}}
          title="Edit Profile"
        />
        <PrimaryButton
          onPress={() => dispatch(onLogoutPress(props))}
          containerStyle={{marginTop: mvs(20)}}
          title="LogOut"
        />
      </View>
    </View>
  );
};
export default Profile;
