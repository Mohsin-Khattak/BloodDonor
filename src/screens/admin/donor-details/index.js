import {PrimaryButton} from 'components/atoms/buttons';
import {Row} from 'components/atoms/row';
import CustomMap from 'components/custom-map';
import MapDirections from 'components/map-directions';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {useAppDispatch, useAppSelector} from 'hooks/use-store';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Marker} from 'react-native-maps';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import {filterCollections, getCurrentUserId} from 'services/firebase';
import {appFBS, onAddDonorPress} from 'services/firebase/firebase-actions';
import Bold from 'typography/bold-text';
import Regular from 'typography/regular-text';
import {SERVICES} from 'utils';
import AppHeader from '../../../components/atoms/headers/index';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import {COLLECTIONS} from 'config/constants';
import {firebase, firestore} from '@react-native-firebase/firestore';
import {Loader} from 'components/atoms/loader';

const DonorDetails = props => {
  const userInfo = props?.route?.params?.info;

  const db = firebase.firestore();
  const hospital = useAppSelector(s => s?.user?.userInfo);
  const [loading, setLoading] = useState(false);
  const [donorLoading, setDonorLoading] = useState(true);
  const [onDonateLoading, setOnDonateLoading] = useState(false);
  const [counter, setCounter] = useState(0);
  const [donorList, setDonorList] = useState(null);
  const currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss');

  const donor = {
    ...userInfo,
    hospitalImage: hospital?.image,
    hospitalName: hospital?.name,
    hospitalCity: hospital?.address?.city,
    currentDateTime: currentDateTime,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  };

  const getData = async () => {
    try {
      setDonorLoading(true);
      const id = getCurrentUserId();
      const snapshot = await db
        .collection('donor')
        .where('hospitalId', '==', id)
        .where('userId', '==', userInfo?.userId)
        .get();

      const users = snapshot.docs.map(doc => doc.data());
      if (users.length > 0) {
        setDonorList(users[0]);
        setCounter(users[0]?.counter || 1);
      }
      setDonorLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error if necessary
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onPressDonate = async () => {
    try {
      setOnDonateLoading(true);

      const hospitalId = getCurrentUserId();
      const donorId = userInfo?.userId;

      // Check if the donor already exists for this hospital
      const snapshot = await db
        .collection('donor')
        .where('hospitalId', '==', hospitalId)
        .where('userId', '==', donorId)
        .get();

      let updatedDonor;
      if (snapshot.docs.length > 0) {
        // Donor exists, update the counter
        const doc = snapshot.docs[0];
        updatedDonor = {
          ...doc.data(),
          counter: doc.data().counter + 1,
          hospitalImage: hospital?.image,
          hospitalName: hospital?.name,
          hospitalCity: hospital?.address?.city,
          currentDateTime: currentDateTime,
          createdAt:
            doc.data().createdAt ||
            firebase.firestore.FieldValue.serverTimestamp(),
        };
      } else {
        // Donor does not exist, create a new entry
        updatedDonor = {
          ...donor,
          counter: 1,
          hospitalId: hospitalId,
          userId: donorId,
        };
      }

      // Save the updated or new donor record
      await onAddDonorPress(updatedDonor, setOnDonateLoading, props);
      setCounter(updatedDonor.counter);
    } catch (error) {
      console.log('Error on donate press:', error);
    } finally {
      setOnDonateLoading(false);
    }
  };

  const navUserToChat = async () => {
    try {
      setLoading(true);
      const id = getCurrentUserId();
      const res = await appFBS.checkMessagesCollection(userInfo?.userId);
      const obj = {
        convoId: res.convoId,
        receiverId: userInfo?.userId,
        receiverName: userInfo?.name,
        myId: id,
      };

      props.navigation.navigate('Inbox', {data: obj});
    } catch (error) {
      console.log('Error in New Message:', error);
    } finally {
      setLoading(false);
    }
  };

  const origin = {
    latitude: hospital?.address?.latitudeDrop || 37.78825,
    longitude: hospital?.address?.longitudeDrop || -122.4324,
  };

  const destination = {
    latitude: userInfo?.address?.latitudeDrop || 37.78825,
    longitude: userInfo?.address?.longitudeDrop || -122.4324,
  };

  return (
    <View style={styles.container}>
      <AppHeader back title="Donor Details" />
      {donorLoading ? (
        <Loader color={colors.primary} />
      ) : (
        <>
          <View style={styles.mapContainer}>
            <CustomMap
              initialRegion={{
                latitude: (origin.latitude + destination.latitude) / 2,
                longitude: (origin.longitude + destination.longitude) / 2,
                latitudeDelta:
                  Math.abs(origin.latitude - destination.latitude) + 0.05,
                longitudeDelta:
                  Math.abs(origin.longitude - destination.longitude) + 0.05,
              }}>
              <Marker coordinate={origin}>
                <Icon name="hospital-o" size={30} color="red" />
              </Marker>
              <Marker coordinate={destination}>
                <Icon name="user" size={30} color="blue" />
              </Marker>
              <MapDirections
                origin={origin}
                destination={destination}
                strokeWidth={3}
                strokeColor="blue"
              />
            </CustomMap>
          </View>
          <View style={{paddingHorizontal: mvs(20), paddingVertical: mvs(10)}}>
            <Row style={{justifyContent: 'flex-start', alignItems: 'center'}}>
              <AntDesign name={'user'} size={25} color={colors.primary} />
              <Bold
                style={{marginLeft: mvs(20)}}
                label={userInfo?.name || 'N/A'}
                fontSize={mvs(16)}
                color={colors.primary}
              />
            </Row>
            <Row style={{justifyContent: 'flex-start', marginTop: mvs(10)}}>
              <Entypo name={'location-pin'} size={25} color={colors.primary} />
              <Regular
                style={{marginLeft: mvs(20), flex: 1}}
                label={`${userInfo?.address?.address} ` || 'N/A'}
                fontSize={mvs(14)}
                color={colors.primary}
              />
            </Row>

            <Row style={{justifyContent: 'flex-start', marginTop: mvs(10)}}>
              <Feather name={'phone'} size={25} color={colors.primary} />
              <Regular
                style={{marginLeft: mvs(20), flex: 1}}
                label={userInfo?.phone || 'N/A'}
                fontSize={mvs(14)}
                color={colors.primary}
              />
            </Row>

            <Row style={{marginTop: mvs(20)}}>
              <PrimaryButton
                onPress={() => SERVICES.dialPhone(userInfo?.phone)}
                containerStyle={styles.btnContainer}
                title="Call"
              />
              <PrimaryButton
                loading={loading}
                onPress={() => navUserToChat()}
                containerStyle={styles.btnContainer}
                title="Chat"
              />
            </Row>
            {userInfo?.userId && (
              <PrimaryButton
                loading={onDonateLoading}
                onPress={onPressDonate}
                containerStyle={{marginTop: mvs(15), borderRadius: mvs(10)}}
                title="Donate Blood"
              />
            )}
          </View>
        </>
      )}
    </View>
  );
};

export default DonorDetails;
