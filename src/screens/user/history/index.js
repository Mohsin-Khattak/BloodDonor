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
import HistoryCard from 'components/atoms/molecules/history-card';
import Bold from 'typography/bold-text';
import CustomFlatList from 'components/atoms/custom-flatlist';
// import {firebase, firestore} from '@react-native-firebase/firestore';

const History = props => {
  // const isFocus = useIsFocused();
  const {userInfo} = useAppSelector(s => s.user);
  const db = firebase.firestore();
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState();
  console.log('data check===>', data);
  const [searchQuery, setSearchQuery] = useState('');
  const getData = async () => {
    try {
      setLoading(true);
      const snapshot = await db
        .collection('donor')
        .where('userId', '==', userInfo?.userId)
        .get();

      const users = snapshot.docs.map(doc => doc.data());

      // Create a Map to store unique hospitalIds
      const hospitalMap = new Map();
      users.forEach(user => {
        if (!hospitalMap.has(user.hospitalId)) {
          hospitalMap.set(user.hospitalId, user);
        }
      });

      // Extract the values from the Map
      const uniqueHospitalUsers = Array.from(hospitalMap.values());

      // If there are multiple hospitals, add all to the result
      const result =
        uniqueHospitalUsers.length > 1
          ? uniqueHospitalUsers
          : [uniqueHospitalUsers[0]];

      setData(result);
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
      const nameMatch = item?.hospitalName
        ? item?.hospitalName?.toLowerCase().includes(searchQuery.toLowerCase())
        : false;

      return nameMatch;
    });
  };

  const renderItem = item => (
    <HistoryCard
      placeholder={'Search Donor'}
      item={item}
      // onPress={() =>
      //   props.navigation.navigate('DonorDetails', {info: item?.item})
      // }
    />
  );
  return (
    <View style={styles.container}>
      <AppHeader back title="History" />
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
export default History;
