import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Image,
  LogBox,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Actions,
  Bubble,
  GiftedChat,
  InputToolbar,
  Send,
} from 'react-native-gifted-chat';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/AntDesign';

// import {commonServices} from '../../../../services/commonServices/commomServices';
import {Row} from 'components/atoms/row';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {appFBS} from 'services/firebase/firebase-actions';
import Bold from 'typography/bold-text';
import {SERVICES} from 'utils';
import styles from './styles';
const Inbox = props => {
  let data = props.route.params.data;
  // console.log('data check===>', data);

  const [messages, setMessages] = useState([]);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    LogBox.ignoreAllLogs();
    firestore()
      .collection('chat')
      .doc(data?.convoId)
      .collection('messages')
      .onSnapshot(onResult, onError);
  }, []);

  async function onResult(QuerySnapshot) {
    let changes = QuerySnapshot.docChanges();
    changes.forEach(async element => {
      await getMessages();
    });
  }
  function onError(error) {
    console.error(error);
  }
  const getMessages = async () => {
    let list = await appFBS.GetMessages(data.convoId);
    console.log('list chat==============>', list);
    setMessages(list);
  };
  const selectPhoto = async () => {
    // setloading(true);
    let res = await SERVICES._returnImageGallery();
    if (res) {
      let img = await appFBS.uploadImage(res, 'chatImages');
      await sendPhoto(img);
    }
    // setloading(false);
  };
  const customInputToolbar = props => {
    return (
      <InputToolbar
        {...props}
        primaryStyle={{
          width: responsiveWidth(90),
          backgroundColor: '#EBEBEB',
          alignItems: 'center',
          alignSelf: 'center',
          borderRadius: responsiveWidth(2),
          height: responsiveHeight(8),
          paddingHorizontal: responsiveWidth(0.8),
          marginBottom: mvs(10),
        }}
        containerStyle={{
          borderTopColor: 'transparent',
        }}
        accessoryStyle={
          {
            // backgroundColor: 'red',
          }
        }
        textInputStyle={{
          // backgroundColor: 'red',
          borderRadius: responsiveWidth(2),
          fontSize: responsiveFontSize(1.5),
          paddingLeft: responsiveWidth(4),
          width: responsiveWidth(55),
          marginRight: responsiveWidth(3),
          color: colors.black,
        }}
      />
    );
  };
  const rendersend = props => {
    // Alert.alert('working on it');
    return (
      <Send
        {...props}
        containerStyle={{
          height: responsiveWidth(10),
          width: responsiveWidth(10),
          backgroundColor: colors.primary,
          borderRadius: responsiveWidth(10),
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: responsiveWidth(1),
        }}>
        <Icon
          name={'right'}
          size={responsiveHeight(2.5)}
          color={'#fff'}
          type="ionicon"
        />
      </Send>
    );
  };
  const renderMessageImage = props => {
    return (
      <View>
        <Image
          resizeMode="cover"
          source={{uri: props?.currentMessage?.image}}
          style={styles.imagestyl}></Image>
      </View>
    );
  };
  const renderAvatar = props => {
    null;
  };
  // function renderActions(props) {
  //   return (
  //     <>
  //       <Actions
  //         {...props}
  //         onPressActionButton={() => selectPhoto()}
  //         containerStyle={{
  //           width: responsiveWidth(6),
  //           height: responsiveHeight(6),
  //           alignItems: 'center',
  //           justifyContent: 'center',
  //           marginTop: responsiveHeight(1),
  //           marginLeft: responsiveWidth(2),
  //         }}
  //         icon={() => (
  //           // <TouchableOpacity onPress={() => selectPhoto()}>
  //           <Icon
  //             name={'right'}
  //             size={responsiveHeight(2.5)}
  //             color={'#fff'}
  //             type="ionicon"
  //           />
  //           // </TouchableOpacity>
  //         )}
  //       />
  //     </>
  //   );
  // }
  const renderBubble = props => {
    return (
      <View>
        <Bubble
          {...props}
          containerStyle={{
            left: {
              borderBottomLeftRadius: responsiveWidth(1),
              borderBottomRightRadius: responsiveWidth(1),
              borderTopLeftRadius: responsiveWidth(1),
              borderTopRightRadius: responsiveWidth(1),
              marginTop: responsiveHeight(2),
            },
            right: {
              borderBottomLeftRadius: responsiveWidth(1),
              borderBottomRightRadius: responsiveWidth(1),
              borderTopLeftRadius: responsiveWidth(1),
              borderTopRightRadius: responsiveWidth(1),
              marginTop: responsiveHeight(2),
            },
          }}
          containerToNextStyle={{
            left: {
              borderBottomLeftRadius: responsiveWidth(1),
              borderBottomRightRadius: responsiveWidth(1),
              borderTopLeftRadius: responsiveWidth(1),
              borderTopRightRadius: responsiveWidth(1),
            },
            right: {
              borderBottomLeftRadius: responsiveWidth(1),
              borderBottomRightRadius: responsiveWidth(1),
              borderTopLeftRadius: responsiveWidth(1),
              borderTopRightRadius: responsiveWidth(1),
            },
          }}
          containerToPreviousStyle={{
            left: {
              borderBottomLeftRadius: responsiveWidth(1),
              borderBottomRightRadius: responsiveWidth(1),
              borderTopLeftRadius: responsiveWidth(1),
              borderTopRightRadius: responsiveWidth(1),
            },
            right: {
              borderBottomLeftRadius: responsiveWidth(1),
              borderBottomRightRadius: responsiveWidth(1),
              borderTopLeftRadius: responsiveWidth(1),
              borderTopRightRadius: responsiveWidth(1),
            },
          }}
          wrapperStyle={{
            left: {
              backgroundColor: '#ccc',
              borderBottomLeftRadius: responsiveWidth(3),
              borderBottomRightRadius: responsiveWidth(3),
              borderTopLeftRadius: responsiveWidth(0),
              borderTopRightRadius: responsiveWidth(3),
            },
            right: {
              borderBottomLeftRadius: responsiveWidth(3),
              borderBottomRightRadius: responsiveWidth(0),
              borderTopLeftRadius: responsiveWidth(3),
              borderTopRightRadius: responsiveWidth(3),
              backgroundColor: colors.primary,
            },
          }}
          textStyle={{
            left: {
              color: '#000',
              // fontFamily: fontFamily.appTextRegular,
              fontSize: responsiveFontSize(1.6),
            },
            right: {
              color: '#fff',
              // fontFamily: fontFamily.appTextRegular,
              fontSize: responsiveFontSize(1.6),
            },
          }}
          bottomContainerStyle={{
            left: {
              backgroundColor: 'f0f',
            },
            right: {
              backgroundColor: 'fff',
            },
          }}
          tickStyle={{}}
          timeTextStyle={{
            right: {color: '#595959'},
            left: {color: '#595959'},
          }}
        />
        {/* <Text style={styles.messageTime2}>{moment().format('LT')}</Text> */}
        <Text
          style={
            props.currentMessage.user._id == data?.receiverId
              ? styles.messageTime
              : styles.messageTime2
          }>
          {moment(Date()).format('LT')}
        </Text>
      </View>
    );
  };
  const sendPhoto = async image => {
    let timestamp = firestore.FieldValue.serverTimestamp();
    let obj = {
      image: image,
      createdAt: timestamp,
      _id: moment().format('YYYYMMDDHHmmss'),
      user: {
        _id: data?.myId,
      },
    };
    await appFBS.sendMessage(data?.convoId, obj);
  };
  const onSend = async messages => {
    let timestamp = firestore.FieldValue.serverTimestamp();
    const {_id, createdAt, text, user} = messages[0];
    let obj = {
      text: text,
      createdAt: timestamp,
      _id: moment().format('YYYYMMDDHHmmss'),
      user: {
        _id: data?.myId,
      },
    };
    await appFBS.sendMessage(data?.convoId, obj);
  };
  // const onSend = useCallback((messages = []) => {
  //   setMessages(previousMessages =>
  //     GiftedChat.append(previousMessages, messages),
  //   );
  // }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subInnerContainer}>
        {/* <AppHeader title="Home" /> */}
        <View
          style={{
            paddingHorizontal: mvs(20),
            paddingVertical: mvs(15),
          }}>
          <Row
            style={{
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => props?.navigation.goBack()}>
              <FontAwesome5
                name={'arrow-left'}
                size={mvs(20)}
                color={colors.primary}
              />
            </TouchableOpacity>
            {/* <View style={styles.imageContainer}>
              <Image
                borderRadius={mvs(10)}
                // source={
                //   info?.receiver_image || receiver_image
                //     ? {uri: info?.receiver_image || receiver_image}
                //     : IMG.messagelogo
                // }
                source={{
                  uri: 'https://t3.ftcdn.net/jpg/01/18/01/98/360_F_118019822_6CKXP6rXmVhDOzbXZlLqEM2ya4HhYzSV.jpg',
                }}
                style={styles.backGroundImage}
              />
            </View> */}
            <View style={{paddingHorizontal: mvs(10), flex: 1}}>
              <Bold
                numberOfLines={1}
                label={data?.name || data?.receiverName}
              />
            </View>
          </Row>
        </View>

        <GiftedChat
          messages={messages}
          onSend={msg => onSend(msg)}
          user={{
            _id: data?.myId,
          }}
          textInputStyle={{color: 'black'}}
          // renderActions={renderActions}
          renderAvatar={renderAvatar}
          showAvatarForEveryMessage={true}
          scrollToBottom
          alwaysShowSend
          inverted={false}
          multiline={false}
          renderDay={() => {
            return null;
          }}
          renderTime={() => {
            return null;
          }}
          renderBubble={renderBubble}
          renderInputToolbar={customInputToolbar}
          renderMessageImage={renderMessageImage}
          isTyping={false}
          placeholder={'Type Message'}
          renderSend={rendersend}
          infiniteScroll={true}
        />
      </View>
    </SafeAreaView>
  );
};

export default Inbox;
