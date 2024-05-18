import {View, Text} from 'react-native';
import React from 'react';
import styles from './styles';
import AppHeader from '../../../components/atoms/headers/index';

const Profile = () => {
  return (
    <View style={styles.container}>
      <AppHeader title="Home" />
      <Text>index</Text>
    </View>
  );
};
export default Profile;
