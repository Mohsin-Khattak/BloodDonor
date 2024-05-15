import { Alert } from "react-native";
import { createUserWithEmailAndPassword, deleteDocument, saveData, signInWithEmailAndPassword } from ".";
import { COLLECTIONS, STORAGEKEYS } from "../../config/constants";
import { AppDispatch, RootState } from "../../store";
import { setUserInfo } from "../../store/reducers/user-reducer";
import { Task } from "../../types/entities-types";
import { SERVICES } from "../../utils";
import { getData } from './index';

export const onLoginPress = (email: string, password: string, props: any) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            const res = await signInWithEmailAndPassword(email, password);
            console.log('res of onLoginPress=>', res);
            const response = await getData('users', res?.user?.uid);
            SERVICES.setItem(STORAGEKEYS.userId, res?.user?.uid);
            dispatch(setUserInfo(response));
            SERVICES.resetStack(props, 'Home');

        } catch (error: any) {
            console.log('error in onLoginPress', error);
            Alert.alert('', SERVICES._returnError(error),);
        }
    }
}
export const onSignupPress = (name: string, email: string, password: string, props: any) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            const res = await createUserWithEmailAndPassword(name, email, password);
            console.log('res of onSignupPress=>', res);
            const user = {
                userId: res?.user?.uid,
                name: name,
                email: email,
            }
            await saveData('users', res?.user?.uid, user);
            SERVICES.setItem(STORAGEKEYS.userId, res?.user?.uid);
            dispatch(setUserInfo(user));
            SERVICES.resetStack(props, 'Home');
        } catch (error: any) {
            console.log('error in onSignupPress', error);
            Alert.alert('', error,);
        }
    }
}
export const onAddTaskPress =  (task: Task, props: any) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            const userId=getState()?.user?.userInfo?.userId;
            const uuid = SERVICES.getUUID();
            await saveData(COLLECTIONS.tasks,task?.id||uuid, {...task,userId});
            console.log('TASK ADDED');

            props?.navigation?.goBack();
            Alert.alert('Your task is added')
        } catch (error: any) {
            console.log('error in onAddTaskPress', error);
            Alert.alert('', error,);
        }
    }
}
export const getUserData =  (userId:string) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            const res = await getData(COLLECTIONS.users,userId);
            dispatch(setUserInfo(res));
        } catch (error: any) {
            console.log('error in getUserData', error);
            Alert.alert('', error,);
        }
    }
}
export const onDeleteTask =  async(docId?:string) => {
        try {
          await deleteDocument(COLLECTIONS.tasks,docId);
        } catch (error: any) {
            console.log('error in onDeleteTask', error);
            Alert.alert('', error,);
        }
}
