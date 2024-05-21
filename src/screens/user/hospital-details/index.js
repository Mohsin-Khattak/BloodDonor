import {View, Text} from 'react-native';
import React from 'react';
import styles from './styles';
import AppHeader from '../../../components/atoms/headers/index';
import CustomMap from 'components/custom-map';
import Bold from 'typography/bold-text';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {Row} from 'components/atoms/row';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Regular from 'typography/regular-text';
import Feather from 'react-native-vector-icons/Feather';
import {PrimaryButton} from 'components/atoms/buttons';
import {getCurrentUserId} from 'services/firebase';
import {appFBS} from 'services/firebase/firebase-actions';
import {SERVICES} from 'utils';
import {useAppSelector} from 'hooks/use-store';
import {Marker} from 'react-native-maps';
import MapDirections from 'components/map-directions';
import Icon from 'react-native-vector-icons/FontAwesome';
const HospitalDetails = props => {
  const userInfo = props?.route?.params?.info?.item;
  // console.log('hospital params check====>', userInfo);

  const user = useAppSelector(s => s.user.userInfo);
  // console.log('current user check===>', user);
  const [loading, setLoading] = React.useState(false);

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
      console.log('Error in New Message====>', error);
    } finally {
      setLoading(false);
    }
  };

  const origin = {
    latitude: userInfo?.address?.latitudeDrop || 37.78825,
    longitude: userInfo?.address?.longitudeDrop || -122.4324,
  };

  const destination = {
    latitude: user?.address?.latitudeDrop || 37.78825,
    longitude: user?.address?.longitudeDrop || -122.4324,
  };

  return (
    <View style={styles.container}>
      <AppHeader back title="Hospital Details" />
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
          <MaterialCommunityIcons
            name={'hospital-building'}
            size={25}
            color={colors.primary}
          />
          <Bold
            style={{marginLeft: mvs(20)}}
            label={userInfo?.name || 'N/A'}
            fontSize={mvs(16)}
            color={colors.primary}
          />
        </Row>
        <Row style={{justifyContent: 'flex-start', marginTop: mvs(10)}}>
          <MaterialCommunityIcons
            name={'hospital-marker'}
            size={25}
            color={colors.primary}
          />
          <Regular
            style={{marginLeft: mvs(20), flex: 1}}
            label={
              userInfo?.city || userInfo?.address
                ? ` ${userInfo.address?.address || ''}`.trim()
                : 'N/A'
            }
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
      </View>
    </View>
  );
};

export default HospitalDetails;
