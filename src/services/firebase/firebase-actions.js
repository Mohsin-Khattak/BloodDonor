import firestore, {firebase} from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {Alert} from 'react-native';
import {
  createUserWithEmailAndPassword,
  deleteDocument,
  getCurrentUserId,
  logout,
  passwordResetWithEmail,
  saveData,
  signInWithEmailAndPassword,
} from '.';
// import storageServices from '../storageServices/storage.services';
// import toastServices from '../toastServices/toast.services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import moment from 'moment';
import {store} from 'store';
import {COLLECTIONS, STORAGEKEYS} from '../../config/constants';
import {reset, setUserInfo, userSlice} from '../../store/reducers/user-reducer';
import {SERVICES} from '../../utils';
import {getData} from './index';
export const onLoginPress = (email, password, setLoading, props) => {
  return async dispatch => {
    try {
      setLoading(true);
      const res = await signInWithEmailAndPassword(email, password);

      const response = await getData('users', res?.user?.uid);
      console.log('res of onLoginPress=>', response);
      SERVICES.setItem(STORAGEKEYS.userId, res?.user?.uid);
      SERVICES.setItem(STORAGEKEYS.role, response?.role);

      dispatch(setUserInfo(response));
      // SERVICES.resetStack(props, 'HospitalStack');
      SERVICES.resetStack(
        props,
        response?.role == 'user' ? 'TabNavigator' : 'HospitalStack',
      );
    } catch (error) {
      console.log('error in onLoginPress', error);
      Alert.alert('', SERVICES.returnError(error));
    } finally {
      setLoading(false);
    }
  };
};
export const onSignupPress = (
  name,
  email,
  password,
  role,
  gender,
  phone,
  address,
  bloodGroup,
  isActive,
  setLoading,
  props,
) => {
  return async dispatch => {
    try {
      setLoading(true);
      const res = await createUserWithEmailAndPassword(
        name,
        role,
        email,
        password,
      );
      console.log('res of onSignupPress=>', res);
      const user = {
        userId: res?.user?.uid,
        name: name,
        email: email,
        role: role,
        gender: gender,
        phone: phone,
        address: address,
        bloodGroup: bloodGroup,
        isActive: isActive,
      };
      await saveData('users', res?.user?.uid, user);

      SERVICES.setItem(STORAGEKEYS.userId, res?.user?.uid);

      dispatch(setUserInfo(user));
      // SERVICES.resetStack(
      props.navigation.navigate(
        role == 'user' ? 'TabNavigator' : 'HospitalStack',
      );
      // );
    } catch (error) {
      console.log('error in onSignupPress', error);
      Alert.alert('', error);
    } finally {
      setLoading(false);
    }
  };
};

export const onLogoutPress = props => {
  return async dispatch => {
    try {
      Alert.alert('Logout', 'Are you sure to logout ?', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          _onPress: async () => {
            try {
              await logout();
              SERVICES._removeEmptyKeys([STORAGEKEYS.userId]);
              dispatch(userSlice.actions.reset());
              store.dispatch(reset(null));
              await AsyncStorage.clear();
              // SERVICES.resetStack('Login');
              props.navigation.navigate('Login');
            } catch (error) {
              console.error('Logout error: ', error);
            }
          },
          get onPress() {
            return this._onPress;
          },
          set onPress(value) {
            this._onPress = value;
          },
        },
      ]);
    } catch (error) {
      console.log('error  ', error);
    }
  };
};
export const handlePasswordReset = async (email, setLoading, props) => {
  try {
    setLoading(true);
    const res = await passwordResetWithEmail(email);
    console.log('Password reset email sent successfully =>', res);

    // props?.navigation?.goBack();
    // SERVICES.resetStack(props, 'VerifyResetPassword');
  } catch (error) {
    console.log('error in handlePasswordReset', error);
    Alert.alert('', SERVICES.returnError(error));
  } finally {
    setLoading(false);
  }
};

export const onAddDonorPress = async (user, setOnDonateLoading, props) => {
  try {
    setOnDonateLoading(true);

    const donorId = user?.userId;
    const hospitalId = user?.hospitalId;

    // Check if the donor already exists for this hospital
    const snapshot = await firebase
      .firestore()
      .collection(COLLECTIONS.donor)
      .where('hospitalId', '==', hospitalId)
      .where('userId', '==', donorId)
      .get();

    if (snapshot.docs.length > 0) {
      // Donor exists, update the record
      const docId = snapshot.docs[0].id;
      await firebase
        .firestore()
        .collection(COLLECTIONS.donor)
        .doc(docId)
        .update(user);
    } else {
      // Donor does not exist, create a new record
      const newDocRef = firebase
        .firestore()
        .collection(COLLECTIONS.donor)
        .doc();
      await newDocRef.set({
        ...user,
        id: newDocRef.id, // Ensure a unique ID is set
      });
    }

    Alert.alert('Donor updated successfully');
    props?.navigation?.navigate('Donors');
  } catch (error) {
    console.log('Error in onAddDonorPress:', error);
    Alert.alert('Error', error.message);
  } finally {
    setOnDonateLoading(false);
  }
};

export const onAddTaskPress = (task, props) => {
  return async dispatch => {
    try {
      const userId = getState()?.user?.userInfo?.userId;
      const uuid = SERVICES.getUUID();
      await saveData(COLLECTIONS.tasks, task?.id || uuid, {...task, userId});
      console.log('TASK ADDED');

      props?.navigation?.goBack();
      Alert.alert('Your task is added');
    } catch (error) {
      console.log('error in onAddTaskPress', error);
      Alert.alert('', error);
    }
  };
};

export const onUpdateProfile = (values, setLoading, props) => {
  return async (dispatch, getState) => {
    try {
      setLoading(true);
      const uid = getCurrentUserId();
      // console.log('user id check====>', uid);
      const user = {
        name: values?.name,
        email: values?.email,
        address: values?.address,
        phone: values?.phone,
        image: values?.image,
        bloodGroup: values?.bloodGroup,
        role: values?.role,
        isActive: values?.isActive,
      };
      await saveData(COLLECTIONS.users, uid, user);
      dispatch(setUserInfo(user));
      props?.navigation?.goBack();
    } catch (error) {
      console.log('error in onPostProfileImagePress', error);
      // Alert.alert('', error);
    } finally {
      setLoading(false);
    }
  };
};

export const getUserData = userId => {
  return async dispatch => {
    try {
      const res = await getData(COLLECTIONS.users, userId);
      dispatch(setUserInfo(res));
    } catch (error) {
      console.log('error in getUserData', error);
      Alert.alert('', error);
    }
  };
};
export const onDeleteTask = async docId => {
  try {
    await deleteDocument(COLLECTIONS.tasks, docId);
  } catch (error) {
    console.log('error in onDeleteTask', error);
    Alert.alert('', error);
  }
};

///////////---------------//////////////

//? ======================== firebase crud function are define below ========================
const uploadImage = async (image, folderName = 'photos') => {
  if (image == null) {
    return null;
  }
  const uploadUri = image;
  let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
  const extension = filename.split('.').pop();
  const name = filename.split('.').slice(0, -1).join('.');
  filename = name + Date.now() + '.' + extension;
  const storageRef = storage().ref(`${folderName}/${filename}`);
  const task = storageRef.putFile(uploadUri);
  task.on('state_changed', taskSnapshot => {
    `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`;
  });

  try {
    await task;
    const url = await storageRef.getDownloadURL();
    return url;
  } catch (e) {
    return null;
  }
};

//? ======================== upload product image to firebase receive image as paramter  ========================
const uploadProductImage = async image => {
  if (image == null) {
    return null;
  }
  const uploadUri = image;
  let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
  const extension = filename.split('.').pop();
  const name = filename.split('.').slice(0, -1).join('.');
  filename = name + Date.now() + '.' + extension;
  const storageRef = storage().ref(`product/${filename}`);
  const task = storageRef.putFile(uploadUri);
  task.on('state_changed', taskSnapshot => {
    `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`;
  });

  try {
    await task;
    const url = await storageRef.getDownloadURL();
    return url;
  } catch (e) {
    return null;
  }
};

//? ======================== auth side all function are define below ========================

const getFCMToken = async id => {
  const user = await firestore().collection('Users').doc(id).get();
  let fcmToken = user.data().fcmToken;
  return fcmToken;
};

const getUserInfo = async (token = null) => {
  // let id = await storageServices.getKey('userId');
  let id = await SERVICES.getItem(STORAGEKEYS.userId);
  if (token) {
    id = token;
  }
  const user = await firestore().collection('users').doc(id).get();
  return user.data();
};

const createFCMToken = async () => {
  const fcmToken = await messaging().getToken();
  return fcmToken;
};

//?============================ messages functions are below ===========================
// ? here we just create new id for conversation  concate sender and receiver id
// ! paramater required sender id receiver id
const createChatID = (myId, receiverId) => {
  let id = [myId, receiverId].sort().join('_');
  return 'chatRoom_' + id;
};

//?  here  i check the conversation if already exist then return that data else
// ?  we call the function which create new collection and return us require data
// ! paramater required sender id receiver id
const checkMessagesCollection = async receiverId => {
  // let myId = await storageServices.getKey('userId');
  let myId = await SERVICES.getItem(STORAGEKEYS.userId);
  let id = createChatID(myId, receiverId);
  let obj = {};
  let data = await firestore().collection('chat').doc(id).get();
  if (data?.exists) {
    obj = {
      convoId: data.id,
    };
  } else {
    obj = await createConversation({myId: myId, receiverId: receiverId});
  }
  return obj;
};

// ? here we we call the create id function and check the conversation with this id
// ! paramater required  sender id and receiver id
// ? and its return us an an object which contain conversation id
const createConversation = async _obj => {
  let obj = {};
  let chatId = createChatID(_obj.myId, _obj.receiverId);
  obj = {
    convoId: chatId,
  };
  await firestore()
    .collection('chat')
    .doc(chatId)
    .set({
      chatContainIDs: [_obj.myId, _obj.receiverId],
      lastMessage: '',
      lastMessageTime: '',
      unreadMessages: 0,
    });
  return obj;
};

// ? we user this function when we send an message
// ! paramater required conversation id and message object like
//!  obj = {
//!   text: text,
//!   created_at: timestamp,
//!   _id:  receiver id ,
//!   user: {
//!     _id: sender Id,
//!   },
//! };
const sendMessage = async (conversationID, mesageObject) => {
  // let timestamp = firestore.FieldValue.serverTimestamp();
  // let id = await storageServices.getKey('userId');
  let id = await SERVICES.getItem(STORAGEKEYS.userId);
  firestore()
    .collection('chat')
    .doc(conversationID)
    .collection('messages')
    .add(mesageObject);
  await updateLastMesaage(
    conversationID,
    mesageObject.text ? mesageObject.text : 'photo',
  );
};

// ? get user all conversation
const getConversationList = async () => {
  // let id = await storageServices.getKey('userId');
  let id = await SERVICES.getItem(STORAGEKEYS.userId);
  let list = [];
  let myInfo = {};
  let receiverInfo = {};
  let receiverId = '';
  let idsList = [];
  let curUserinfo;
  myInfo = await getUserInfo(id);
  let querySnapshot = await firestore().collection('chat').get();
  for (let index = 0; index < querySnapshot.docs.length; index++) {
    let doc = querySnapshot.docs[index].data();
    idsList = querySnapshot.docs[index].data().chatContainIDs;
    if (idsList?.includes(id)) {
      if (idsList[0] == id) {
        curUserinfo = idsList[0];
        receiverId = idsList[1];
      } else {
        curUserinfo = idsList[1];
        receiverId = idsList[0];
      }
      receiverInfo = await getUserInfo(receiverId);
      let obj = {
        convoId: querySnapshot.docs[index].id,
        myId: id,
        recieverId: receiverId,
        profilePicture: receiverInfo?.image,
        lastMessage: doc.lastMessage,
        name: receiverInfo?.name,
        unread: doc.unreadMessages,
        messageTime: doc.lastMessageTime,
      };
      list.push(obj);
    }
  }

  return list;
};

// ? update conversation last message
// ! paramater required conversation id and last message
const updateLastMesaage = async (conversationID, msg) => {
  firestore()
    .collection('chat')
    .doc(conversationID)
    .update({
      lastMessage: msg,
      lastMessageTime: moment().format('YYYY-MM-DD:HH:mm:ss'),
    });
};

// ? get all messages
// ! paramater required  conversation id
const GetMessages = async conversationId => {
  let list = [];
  let querySnapshot = await firestore()
    .collection('chat')
    .doc(conversationId)
    .collection('messages')
    .orderBy('createdAt', 'desc')
    .get();
  querySnapshot.docs.map(doc => {
    list.push(doc.data());
  });
  list = list.sort((a, b) => {
    return (
      moment(b.createdAt).format('YYYYMMDDHHmmss') -
      moment(a.createdAt).format('YYYYMMDDHHmmss')
    );
  });
  return list.reverse();
};
export const appFBS = {
  uploadImage,
  getData,
  getUserInfo,
  getFCMToken,
  createFCMToken,
  uploadProductImage,
  getConversationList,
  sendMessage,
  createConversation,
  checkMessagesCollection,
  GetMessages,
};
