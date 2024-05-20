import CustomMap from 'components/custom-map';
import React from 'react';
import {View} from 'react-native';
import AppHeader from '../../../components/atoms/headers/index';
import styles from './styles';
import Geocoder from 'react-native-geocoding';

const Location = props => {
  Geocoder.init('AIzaSyDGDrN2RHbsqaNEuO0mCN3-MaqtzHgFgmA');
  const handleGetCurrentLocation = locationData => {
    console.log('Current Location Data:', locationData);
  };
  const [payload, setPayload] = React.useState();
  console.log(payload);
  return (
    <View style={styles.container}>
      <AppHeader back title="Location" />

      {/* <CustomMap
      
        isCurrentLocation={true}
        enabledMarkLocation={true}
        updateCurrentLocation={true}
        getCurrentLocation={handleGetCurrentLocation}
      />
       */}
      <CustomMap
        isCurrentLocation={true}
        enabledMarkLocation={true}
        updateCurrentLocation={true}
        getCurrentLocation={handleGetCurrentLocation}
        onPress={res => {
          setPayload({
            address: res?.fulladdress,
            title: res?.city,
            coordinate: res?.coordinate,
          });
        }}></CustomMap>
    </View>
  );
};
export default Location;
