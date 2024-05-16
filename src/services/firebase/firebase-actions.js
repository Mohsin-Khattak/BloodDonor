import {Alert} from 'react-native';
import {
  createUserWithEmailAndPassword,
  deleteDocument,
  passwordResetWithEmail,
  saveData,
  signInWithEmailAndPassword,
} from '.';
import {COLLECTIONS, STORAGEKEYS} from '../../config/constants';
import {setUserInfo} from '../../store/reducers/user-reducer';
import {SERVICES} from '../../utils';
import {getData} from './index';

export const onLoginPress = (email, password, setLoading, props) => {
  return async dispatch => {
    try {
      setLoading(true);
      const res = await signInWithEmailAndPassword(email, password);
      console.log('res of onLoginPress=>', res);
      const response = await getData('users', res?.user?.uid);
      SERVICES.setItem(STORAGEKEYS.userId, res?.user?.uid);
      dispatch(setUserInfo(response));
      SERVICES.resetStack(props, 'Home');
    } catch (error) {
      console.log('error in onLoginPress', error);
      Alert.alert('', SERVICES._returnError(error));
    } finally {
      setLoading(false);
    }
  };
};
export const onSignupPress = (name, email, password, setLoading, props) => {
  return async dispatch => {
    try {
      setLoading(true);
      const res = await createUserWithEmailAndPassword(name, email, password);
      console.log('res of onSignupPress=>', res);
      const user = {
        userId: res?.user?.uid,
        name: name,
        email: email,
      };
      await saveData('users', res?.user?.uid, user);
      SERVICES.setItem(STORAGEKEYS.userId, res?.user?.uid);
      dispatch(setUserInfo(user));
      SERVICES.resetStack(props, 'Home');
    } catch (error) {
      console.log('error in onSignupPress', error);
      Alert.alert('', error);
    } finally {
      setLoading(false);
    }
  };
};
// export const handlePasswordReset = async (email, setLoading, props) => {
//   try {
//     setLoading(true);
//     const res = await passwordResetWithEmail(email);
//     console.log('Passwor reset email sent successfully =>', res);

//     // Assuming SERVICES.navigation is a function that navigates to the Login screen
//     SERVICES.navigation(props, 'Login');
//   } catch (error) {
//     console.error('Error in handlePasswordReset', error);
//     Alert.alert('Error', error.message || 'An error occurred');
//   } finally {
//     setLoading(false);
//   }
// };
export const handlePasswordReset = async (email, setLoading, props) => {
  try {
    setLoading(true);
    const res = await passwordResetWithEmail(email);
    console.log('Password reset email sent successfully =>', res);

    // props?.navigation?.goBack();
    // SERVICES.resetStack(props, 'VerifyResetPassword');
  } catch (error) {
    console.log('error in handlePasswordReset', error);
    Alert.alert('', SERVICES._returnError(error));
  } finally {
    setLoading(false);
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
export const getUserData = userI => {
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
