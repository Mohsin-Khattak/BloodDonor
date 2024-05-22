import {Loader} from 'components/atoms/loader';
import HospitalsCard from 'components/atoms/molecules/hospitals-card';
import {mvs} from 'config/metrices';
import React, {useState, useEffect} from 'react';
import {FlatList, View} from 'react-native';
import AppHeader from '../../../components/atoms/headers/index';
import styles from './styles';
import {filterCollections} from 'services/firebase';
import {COLLECTIONS} from 'config/constants';
import {SearchInput} from 'components/atoms/inputs';
import {useAppSelector} from 'hooks/use-store';

const Home = props => {
  const {userInfo} = useAppSelector(s => s.user);
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const getData = async () => {
    try {
      setLoading(true);
      const res = await filterCollections(
        COLLECTIONS?.users,
        'role',
        '==',
        'admin',
      );

      setData(res);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const filterData = () => {
    return data.filter(item => {
      const nameMatch = item?.name
        ? item?.name?.toLowerCase().includes(searchQuery.toLowerCase())
        : false;

      const cityMatch = item?.address?.city
        ? item.address.city.toLowerCase().includes(searchQuery.toLowerCase())
        : false;

      return nameMatch || cityMatch;
    });
  };
  const renderItem = item => (
    <HospitalsCard
      item={item}
      onPress={() => props.navigation.navigate('HospitalDetails', {info: item})}
    />
  );
  return (
    <View style={styles.container}>
      <AppHeader title="Home" />
      <SearchInput
        containerStyle={{marginHorizontal: mvs(20), marginVertical: mvs(10)}}
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search by Hospital Name or City"
      />

      {loading ? (
        <Loader />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={filterData()}
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
