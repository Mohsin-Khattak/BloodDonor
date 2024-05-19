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

const HospitalDetails = () => {
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
            label={'Jinnah Hospital'}
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
              'Ahmed, Usmani Rd, Faisal Town, Lahore, Punjab 54550, Pakistan'
            }
            fontSize={mvs(14)}
            color={colors.primary}
          />
        </Row>
        <Row style={{justifyContent: 'flex-start', marginTop: mvs(10)}}>
          <Feather name={'phone'} size={25} color={colors.primary} />
          <Regular
            style={{marginLeft: mvs(20), flex: 1}}
            label={'03448422399'}
            fontSize={mvs(14)}
            color={colors.primary}
          />
        </Row>
        <Row style={{marginTop: mvs(20)}}>
          <PrimaryButton containerStyle={styles.btnContainer} title="Call" />
          <PrimaryButton containerStyle={styles.btnContainer} title="Chat" />
        </Row>
      </View>
    </View>
  );
};
export default HospitalDetails;
