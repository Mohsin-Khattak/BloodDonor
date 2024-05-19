import CustomMap from 'components/custom-map';
import React from 'react';
import {View} from 'react-native';
import AppHeader from '../../../components/atoms/headers/index';
import styles from './styles';

const Location = props => {
  const userInfo = props?.route?.params?.info;
  console.log('params data check===>', userInfo);
  const handleGetCurrentLocation = locationData => {
    console.log('Current Location Data:', locationData);
  };
  return (
    <View style={styles.container}>
      <AppHeader back title="Location" />

      <CustomMap
        isCurrentLocation={true}
        enabledMarkLocation={true}
        updateCurrentLocation={true}
        getCurrentLocation={handleGetCurrentLocation}
      />
    </View>
  );
};
export default Location;
