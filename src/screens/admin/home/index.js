import {Loader} from 'components/atoms/loader';
import DonorsCard from 'components/atoms/molecules/donors-card';
import {mvs} from 'config/metrices';
import React, {useState, useEffect} from 'react';
import {FlatList, View} from 'react-native';
import AppHeader from '../../../components/atoms/headers/index';
import styles from './styles';
import {SearchInput} from 'components/atoms/inputs';
import {filterCollections} from 'services/firebase';
import {COLLECTIONS} from 'config/constants';
import {useAppSelector} from 'hooks/use-store';

const Home = props => {
  // const isFocus = useIsFocused();
  const {userInfo} = useAppSelector(s => s.user);
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState();
  const [searchQuery, setSearchQuery] = useState('');
  const getData = async () => {
    try {
      setLoading(true);
      const res = await filterCollections(
        COLLECTIONS?.users,
        'role',
        '==',
        'user',
      );
      console.log('user data check====>', res);

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
      const nameMatch = item.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const cityMatch = item.city
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const bloodGroupMatch = item.bloodGroup
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return nameMatch || cityMatch || bloodGroupMatch;
    });
  };

  const renderItem = item => (
    <DonorsCard
      placeholder={'Search Donor'}
      item={item}
      onPress={() =>
        props.navigation.navigate('DonorDetails', {info: item?.item})
      }
    />
  );
  return (
    <View style={styles.container}>
      <AppHeader title="Home" />
      <SearchInput
        containerStyle={{marginHorizontal: mvs(20), marginVertical: mvs(10)}}
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search by name, city, or blood group"
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
