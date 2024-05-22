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

const HistoryCard = ({item, style, onPress, loading}) => {
  console.log('item check====>', item?.item);
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
          source={{
            uri:
              item?.item?.hospitalImage ||
              'https://t3.ftcdn.net/jpg/01/18/01/98/360_F_118019822_6CKXP6rXmVhDOzbXZlLqEM2ya4HhYzSV.jpg',
          }}
          style={styles.backGroundImage}
        />
        <View style={styles.innerContainer}>
          <Bold
            fontSize={mvs(16)}
            color={colors.primary}
            label={item?.item?.hospitalName}
          />

          <Row style={styles.rowContainer}>
            <Entypo size={25} name={'location-pin'} color={colors.primary} />
            <View style={{marginLeft: mvs(10)}}>
              <Medium
                color={colors.black}
                fontSize={mvs(14)}
                label={item?.item?.hospitalCity}
              />
            </View>
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
            <View style={{marginLeft: mvs(10), flex: 0}}>
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
export default React.memo(HistoryCard);
