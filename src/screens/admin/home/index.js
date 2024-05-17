import {View, Text} from 'react-native';
import React from 'react';
import styles from './styles';
import {useAppSelector} from 'hooks/use-store';
import CustomMap from 'components/custom-map';

const Home = () => {
  const location = useAppSelector(s => s?.user);
  console.log('location::', location);
  return (
    <View style={styles.container}>
      <Text>User Home</Text>
    </View>
  );
};
export default Home;
