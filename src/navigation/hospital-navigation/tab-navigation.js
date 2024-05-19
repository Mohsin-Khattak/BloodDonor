import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {Platform, StatusBar, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Home from 'screens/admin/home';
import Chat from 'screens/chat';
import Profile from 'screens/admin/profile';
import Donors from 'screens/admin/donors';
import {colors} from 'config/colors';

const Tab = createBottomTabNavigator();
const BottomTab = createNativeStackNavigator();

const TabNavigator = () => {
  return (
    <View style={{backgroundColor: colors.primary, flex: 1}}>
      <StatusBar
        translucent={false}
        backgroundColor={'#ffffff'}
        barStyle={Platform?.OS === 'ios' ? 'default' : 'dark-content'}
      />
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarStyle: {
            position: 'absolute',
            backgroundColor: colors.secondary,
          },
          headerShown: false,
          tabBarShowLabel: false,
        })}>
        <BottomTab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: focused => (
              <AntDesign
                name="home"
                size={25}
                color={focused ? colors.primary : 'black'}
              />
            ),
          }}
        />

        {/* <BottomTab.Screen
          name="Donors"
          component={Donors}
          options={{
            tabBarIcon: focused => (
              <Feather
                name="users"
                size={25}
                color={focused ? colors.primary : 'black'}
              />
            ),
          }}
        /> */}
        <BottomTab.Screen
          name="Chat"
          component={Chat}
          options={{
            tabBarIcon: focused => (
              <AntDesign
                name="message1"
                size={25}
                color={focused ? colors.primary : 'black'}
              />
            ),
          }}
        />
        <BottomTab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: focused => (
              <Feather
                name="user"
                size={25}
                color={focused ? colors.primary : 'black'}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};
export default TabNavigator;
