import {mvs} from 'config/metrices';
import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import Regular from 'typography/regular-text';
import styles from './styles';

import {Row} from 'components/atoms/row';
import {colors} from 'config/colors';
import Bold from 'typography/bold-text';

const ChatCard = ({item, style, onPress, loading}) => {
  console.log('first=====>', item);
  // first=====> {"convoId": "chatRoom_THfIIXOFOsSZWYRonwjAqJhFjIC3_jWkZUlSkhyQKjFu91bxf1sEkCJQ2", "lastMessage": "hello", "messageTime": "2024-05-19:16:37:31", "myId": "THfIIXOFOsSZWYRonwjAqJhFjIC3", "name": "Alshifa Hospital", "profilePicture": undefined, "recieverId": "jWkZUlSkhyQKjFu91bxf1sEkCJQ2", "unread": 0}

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Row style={styles.InnerContainer}>
        <View style={styles.imageContainer}>
          <Image
            borderRadius={mvs(10)}
            // source={
            //   item?.receiver_image
            //     ? {uri: item?.receiver_image}
            //     : IMG?.DrawerLogo
            // }
            source={{
              uri:
                item?.profilePicture ||
                'https://t3.ftcdn.net/jpg/01/18/01/98/360_F_118019822_6CKXP6rXmVhDOzbXZlLqEM2ya4HhYzSV.jpg',
            }}
            style={styles.backGroundImage}
          />

          {/* <Image source={{uri: item?.image}} style={styles.innerImage} /> */}
        </View>
        <View style={{paddingHorizontal: mvs(10), flex: 1}}>
          <Bold color={colors.black} label={item?.name || 'N/A'} />
          <Regular
            color={colors.black}
            numberOfLines={1}
            label={item?.lastMessage || 'N/A'}
          />
        </View>
        {/* <Regular label={'08:06'} /> */}
      </Row>
    </TouchableOpacity>
  );
};
export default React.memo(ChatCard);
