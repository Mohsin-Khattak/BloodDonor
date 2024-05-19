import {mvs} from 'config/metrices';
import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import Regular from 'typography/regular-text';
import styles from './styles';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Row} from 'components/atoms/row';
import {colors} from 'config/colors';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';

const DonorsCard = ({item, style, onPress, loading}) => {
  const capitalizeFirstLetter = string => {
    if (!string) return 'N/A';
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Row style={{justifyContent: 'flex-start'}}>
        <Image
          // borderRadius={mvs(10)}
          // source={
          //   item?.receiver_image
          //     ? {uri: item?.receiver_image}
          //     : IMG?.DrawerLogo
          // }
          source={{
            uri:
              item?.item?.image ||
              'https://cdn.pixabay.com/photo/2023/12/04/18/40/imran-khan-8430113_1280.jpg',
          }}
          style={styles.backGroundImage}
        />
        <View style={styles.innerContainer}>
          <Bold
            fontSize={mvs(16)}
            color={colors.primary}
            label={item?.item?.name}
          />

          <Row style={styles.rowContainer}>
            <Entypo size={25} name={'location-pin'} color={colors.primary} />
            <View style={{marginLeft: mvs(10)}}>
              <Medium
                color={colors.black}
                fontSize={mvs(14)}
                label={item?.item?.city}
              />
            </View>
          </Row>
          <Row style={styles.rowContainer}>
            <Feather size={20} name={'phone'} color={colors.primary} />
            <View style={{marginLeft: mvs(10)}}>
              <Medium
                color={colors.black}
                fontSize={mvs(14)}
                label={item?.item?.phone}
              />
            </View>
          </Row>
          <Row style={styles.rowContainer}>
            <MaterialIcons
              size={25}
              name={'bloodtype'}
              color={colors.primary}
            />
            <View style={{marginLeft: mvs(10)}}>
              <Medium
                color={colors.black}
                fontSize={mvs(14)}
                label={item?.item?.bloodGroup}
              />
            </View>
          </Row>
          <Row style={styles.rowContainer}>
            <MaterialIcons size={25} name={'man'} color={colors.primary} />
            <View style={{marginLeft: mvs(10)}}>
              <Medium
                color={colors.black}
                fontSize={mvs(14)}
                label={capitalizeFirstLetter(item?.item?.gender)}
              />
            </View>
          </Row>
        </View>
      </Row>
    </TouchableOpacity>
  );
};
export default React.memo(DonorsCard);
