import {firebase} from '@react-native-firebase/firestore';
import {SearchInput} from 'components/atoms/inputs';
import {Loader} from 'components/atoms/loader';
import DonorsListCard from 'components/atoms/molecules/donors-list-card';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {useAppSelector} from 'hooks/use-store';
import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import AppHeader from '../../../components/atoms/headers/index';
import styles from './styles';
import {filterCollections, getCurrentUserId} from 'services/firebase';
import {COLLECTIONS} from 'config/constants';
import {useFocusEffect} from '@react-navigation/native';
import CustomFlatList from 'components/atoms/custom-flatlist';

const Donors = props => {
  // const isFocus = useIsFocused();
  const {userInfo} = useAppSelector(s => s.user);

  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const getData = async () => {
    try {
      setLoading(true);
      const id = getCurrentUserId();
      const res = await filterCollections(
        COLLECTIONS?.donor,
        'hospitalId',
        '==',
        id,
      );

      // Sort the data by currentDateTime field in descending order
      const sortedData = res.sort(
        (a, b) => new Date(b.currentDateTime) - new Date(a.currentDateTime),
      );

      setData(sortedData);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error if necessary
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      // Your reload logic here, e.g., fetch data or update state
      console.log('Screen is focused');
      getData();
      return () => {
        // Optionally, you can clean up here when the screen loses focus
      };
    }, []),
  );

  const filterData = () => {
    return data.filter(item => {
      const nameMatch = item?.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return nameMatch;
    });
  };

  const renderItem = item => (
    <DonorsListCard
      placeholder={'Search Donor'}
      item={item}
      // onPress={() =>
      //   props.navigation.navigate('DonorDetails', {info: item?.item})
      // }
    />
  );
  return (
    <View style={styles.container}>
      <AppHeader back title="Donors List" />
      <SearchInput
        containerStyle={{marginHorizontal: mvs(20), marginVertical: mvs(10)}}
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search by name"
      />
      {loading ? (
        <Loader color={colors.primary} />
      ) : (
        <CustomFlatList
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
export default Donors;
