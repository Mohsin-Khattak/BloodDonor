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

const HospitalDetails = props => {
  const userInfo = props?.route?.params?.info?.item;

  const navUserToChat = async () => {
    // setLoading(true);
    const id = getCurrentUserId();
    // let receiverInfo = await appFBS.getUserInfo(data?.addedBy);
    let res = await appFBS.checkMessagesCollection(userInfo?.userId);
    let obj = {
      convoId: res.convoId,

      receiverId: userInfo?.userId,

      receiverName: userInfo?.name,

      myId: id,
    };

    props.navigation.navigate('Inbox', {data: obj});

    // setLoading(false);
  };

  return (
    <View style={styles.container}>
      <AppHeader back title="Hospital Details" />
      <View style={styles.mapContainer}>
        <CustomMap />
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
