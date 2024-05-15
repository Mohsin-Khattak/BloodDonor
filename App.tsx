import { NavigationContainer,DefaultTheme} from '@react-navigation/native';
import React from 'react';
import {View, Text} from 'react-native';
import { useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {RootNavigator} from 'navigation/root-navigation';
import {Provider} from 'react-redux'
import 'translation'
import { darkTheme, lightTheme } from 'config/colors';
import { store } from 'store';
const App = () => {
  const scheme = useColorScheme();
  const MyTheme = {
    ...DefaultTheme,
    colors:scheme? {
      ...DefaultTheme.colors,
      ...lightTheme,
    }:
    {
      ...DefaultTheme.colors,
      ...darkTheme,
    },
  };
  return (
    <SafeAreaProvider style={{flex: 1}}>
    <Provider store={store}>
      <NavigationContainer>
      <RootNavigator />
      </NavigationContainer>
    </Provider>
    </SafeAreaProvider>
  );
};
export default App;
