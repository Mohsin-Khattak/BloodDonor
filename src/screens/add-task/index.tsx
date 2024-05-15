import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { View } from 'react-native';
import { KeyboardAvoidScrollview } from '../../components/atoms/keyboard-avoid-scrollview';
import AppHeader from '../../components/atoms/headers/index';
import PrimaryInput from '../../components/atoms/inputs';
import RootStackParamList from '../../types/navigation-types/root-stack';
import styles from './styles';
import { onAddTaskPress } from '../../services/firebase/firebase-actions';
import { useAppDispatch } from '../../hooks/use-store';
import { PrimaryButton } from '../../components/atoms/buttons';
type props = NativeStackScreenProps<RootStackParamList, 'AddTask'>;

const AddTask = (props: props) => {
  const { navigation,route } = props;
  const task =route?.params;
  const dispatch =useAppDispatch();
  const [values, setValues] = React.useState({
    id:task?.id||'',
    title:task?.title|| '',
    time:task?.time|| '',
    description:task?.description|| '',
  });

  return (
    <View style={styles.container}>
      <AppHeader back title={task?"Edit Task":'Add Task' }/>
      <KeyboardAvoidScrollview contentContainerStyle={styles.contentContainerStyle}>
        <PrimaryInput label={'Title'} onChangeText={(str) => setValues({ ...values, title: str })} value={values.title} />
        <PrimaryInput label={'Time'} onChangeText={(str) => setValues({ ...values, time: str })} value={values.time} />
        <PrimaryInput label={'Description'} onChangeText={(str) => setValues({ ...values, description: str })} value={values.description} />
        <PrimaryButton title={task?'Save Task':'Add Task'} onPress={() =>dispatch(onAddTaskPress(values,props))} containerStyle={styles.button} />
      </KeyboardAvoidScrollview>
    </View>

  );
};
export default AddTask;
