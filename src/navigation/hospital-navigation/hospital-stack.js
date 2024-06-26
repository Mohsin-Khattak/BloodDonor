// In App.js in a new project
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import * as React from 'react';
import {Platform, StatusBar, StyleSheet, View} from 'react-native';

import {horizontalAnimation} from 'utils';
import TabNavigator from './tab-navigation';
import Inbox from 'screens/inbox';
import DonorDetails from 'screens/admin/donor-details';
import Donors from 'screens/admin/donors';
const Stack = createNativeStackNavigator();

export const HospitalStack = props => {
  const {inititalRoute, data} = props?.route?.params || {};
  return (
    <View style={styles.container}>
      <StatusBar
        translucent={false}
        backgroundColor={'#ffffff'}
        barStyle={Platform?.OS === 'ios' ? 'default' : 'dark-content'}
      />
      <Stack.Navigator
        initialRouteName={inititalRoute || 'TabNavigator'}
        screenOptions={horizontalAnimation}>
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
        <Stack.Screen name="DonorDetails" component={DonorDetails} />
        <Stack.Screen name="Inbox" component={Inbox} />
        {/* <Stack.Screen name="Donors" component={Donors} /> */}
      </Stack.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
});
