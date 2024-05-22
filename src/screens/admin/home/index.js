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
import {colors} from 'config/colors';
import {firebase, firestore} from '@react-native-firebase/firestore';
import CustomMap from 'components/custom-map';
import {Marker} from 'react-native-maps';

const Home = props => {
  // const isFocus = useIsFocused();

  const db = firebase.firestore();
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState();
  // console.log('data check===>', data);
  const [searchQuery, setSearchQuery] = useState('');
  const hospitalInfo = useAppSelector(s => s?.user?.userInfo);
  // console.log('userinfo check===>', hospitalInfo?.address);
  const getData = async () => {
    try {
      setLoading(true);
      const snapshot = await db
        .collection('users')
        .where('role', '==', 'user')
        .where('isActive', '==', '1')
        .get();

      const users = snapshot.docs.map(doc => doc.data());
      setData(users);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error if necessary
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

      const bloodGroupMatch = item?.bloodGroup
        ? item?.bloodGroup?.toLowerCase().includes(searchQuery.toLowerCase())
        : false;

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
  const hospitalLatitude = hospitalInfo?.address?.latitudeDrop || 30.3753;
  const hospitalLongitude = hospitalInfo?.address?.longitudeDrop || 69.3451;

  return (
    <View style={styles.container}>
      <AppHeader title="Home" />

      <SearchInput
        containerStyle={styles.serachInput}
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search by name, city, or blood group"
      />

      {loading ? (
        <Loader color={colors.primary} />
      ) : (
        <View style={{flex: 1}}>
          <CustomMap
            initialRegion={{
              latitude: hospitalLatitude || 30.3753, // Default to center of Pakistan if no hospital info
              longitude: hospitalLongitude || 69.3451, // Default to center of Pakistan if no hospital info
              latitudeDelta: 10,
              longitudeDelta: 10,
            }}>
            {hospitalLatitude && hospitalLongitude && (
              <Marker
                coordinate={{
                  latitude: hospitalLatitude,
                  longitude: hospitalLongitude,
                }}
                title={'Hospital'}
                description={'Hospital Location'}
                pinColor="blue"
              />
            )}
            {filterData().map(
              (user, index) =>
                user?.address?.latitudeDrop &&
                user?.address?.longitudeDrop && (
                  <Marker
                    key={index}
                    coordinate={{
                      latitude: user.address.latitudeDrop,
                      longitude: user.address.longitudeDrop,
                    }}
                    title={user.name}
                    description={`Blood Group: ${user.bloodGroup}`}
                    onPress={() =>
                      props.navigation.navigate('DonorDetails', {info: user})
                    }
                  />
                ),
            )}
          </CustomMap>
        </View>
      )}
    </View>
  );
};
export default Home;
