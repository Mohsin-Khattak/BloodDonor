import {mvs} from 'config/metrices';
import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import Regular from 'typography/regular-text';
import styles from './styles';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Row} from 'components/atoms/row';
import {colors} from 'config/colors';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import moment from 'moment';

const DonorsListCard = ({item, style, onPress, loading}) => {
  const capitalizeFirstLetter = string => {
    if (!string) return 'N/A';
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };
  const formattedDateTime = moment(item?.item?.currentDateTime).format(
    'MMMM Do YYYY',
  );
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
              'https://t3.ftcdn.net/jpg/01/18/01/98/360_F_118019822_6CKXP6rXmVhDOzbXZlLqEM2ya4HhYzSV.jpg',
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
                label={item?.item?.address?.city}
              />
            </View>
          </Row>
          {/* <Row style={styles.rowContainer}>
            <Feather size={20} name={'phone'} color={colors.primary} />
            <View style={{marginLeft: mvs(10)}}>
              <Medium
                color={colors.black}
                fontSize={mvs(14)}
                label={item?.item?.phone}
              />
            </View>
          </Row> */}

          <Row>
            <Row style={{...styles.rowContainer, width: '50%', flex: 1}}>
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
            <Row style={{...styles.rowContainer, width: '50%'}}>
              <MaterialIcons size={25} name={'man'} color={colors.primary} />
              <View style={{marginLeft: mvs(10)}}>
                <Medium
                  color={colors.black}
                  fontSize={mvs(14)}
                  label={capitalizeFirstLetter(item?.item?.gender)}
                />
              </View>
            </Row>
          </Row>

          <Row style={styles.rowContainer}>
            <MaterialCommunityIcons
              size={25}
              name={'counter'}
              color={colors.primary}
            />
            <View style={{marginLeft: mvs(10)}}>
              <Medium
                color={colors.black}
                fontSize={mvs(14)}
                label={item?.item?.counter}
              />
            </View>
          </Row>
          <Row style={styles.rowContainer}>
            <MaterialCommunityIcons
              size={25}
              name={'update'}
              color={colors.primary}
            />
            <View style={{marginLeft: mvs(10), flex: 1}}>
              <Medium
                color={colors.black}
                fontSize={mvs(14)}
                label={formattedDateTime}
              />
            </View>
          </Row>
        </View>
      </Row>
    </TouchableOpacity>
  );
};
export default React.memo(DonorsListCard);
