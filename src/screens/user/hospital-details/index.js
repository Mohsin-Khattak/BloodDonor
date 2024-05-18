import {View, Text} from 'react-native';
import React from 'react';
import styles from './styles';
import AppHeader from '../../../components/atoms/headers/index';
import CustomMap from 'components/custom-map';
import Bold from 'typography/bold-text';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';

const HospitalDetails = () => {
  return (
    <View style={styles.container}>
      <AppHeader back title="Hospital Details" />
      <View style={styles.mapContainer}>
        <CustomMap />
      </View>
      <View style={{paddingHorizontal: mvs(20), paddingVertical: mvs(10)}}>
        <Bold
          label={'Jinnag Hospital'}
          fontSize={mvs(16)}
          color={colors.primary}
        />
      </View>
    </View>
  );
};
export default HospitalDetails;
