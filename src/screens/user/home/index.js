import {Loader} from 'components/atoms/loader';
import HospitalsCard from 'components/atoms/molecules/hospitals-card';
import {mvs} from 'config/metrices';
import React from 'react';
import {FlatList, View} from 'react-native';
import AppHeader from '../../../components/atoms/headers/index';
import styles from './styles';

const Home = props => {
  // const isFocus = useIsFocused();
  // const {chat} = useAppSelector(s => s);

  const [loading, setLoading] = React.useState(false);
  const data = [
    {id: 1, name: 'Mohsin'},
    {id: 2, name: 'Ali'},
    {id: 3, name: 'Aqib'},
    {id: 4, name: 'Aqib'},
    {id: 5, name: 'Aqib'},
  ];

  const renderItem = item => (
    <HospitalsCard
      item={item}
      onPress={() => props.navigation.navigate('HospitalDetails', {info: item})}
    />
  );
  return (
    <View style={styles.container}>
      <AppHeader title="Home" />

      {loading ? (
        <Loader />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingBottom: mvs(60),
            paddingHorizontal: mvs(20),
          }}
        />
      )}
    </View>
  );
};
export default Home;
