import {mvs} from 'config/metrices';
import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import Regular from 'typography/regular-text';
import styles from './styles';
import Entypo from 'react-native-vector-icons/Entypo';
import {Row} from 'components/atoms/row';
import {colors} from 'config/colors';
import Bold from 'typography/bold-text';

const HospitalCard = ({item, style, onPress, loading}) => {
  const data = item?.item;
  console.log('first', data);
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image
        // borderRadius={mvs(10)}
        // source={
        //   item?.receiver_image
        //     ? {uri: item?.receiver_image}
        //     : IMG?.DrawerLogo
        // }
        source={{
          uri:
            data?.image ||
            'https://thumbs.dreamstime.com/b/hospital-building-modern-parking-lot-59693686.jpg',
        }}
        style={styles.backGroundImage}
      />
      <View style={styles.innerContainer}>
        <Bold
          fontSize={mvs(16)}
          color={colors.primary}
          label={data?.name || 'N/A'}
        />

        <Row style={{justifyContent: 'flex-start', gap: mvs(10)}}>
          <Entypo size={25} name={'location-pin'} color={colors.primary} />
          <View style={{flex: 1}}>
            <Regular
              color={colors.black}
              fontSize={mvs(14)}
              label={
                data?.city || data?.address
                  ? `${data.address?.address || ''}`.trim()
                  : 'N/A'
              }
            />
          </View>
        </Row>
      </View>
    </TouchableOpacity>
  );
};
export default React.memo(HospitalCard);
