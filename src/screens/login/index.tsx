import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Alert, TouchableOpacity, View} from 'react-native';
import {KeyboardAvoidScrollview} from '../../components/atoms/keyboard-avoid-scrollview';
import {PrimaryButton} from '../../components/atoms/buttons';
import AppHeader from '../../components/atoms/headers/index';
import PrimaryInput from '../../components/atoms/inputs';
import RootStackParamList from '../../types/navigation-types/root-stack';
import styles from './styles';
import {onLoginPress} from '../../services/firebase/firebase-actions';
import Medium from '../../typography/medium-text';
import {useAppDispatch, useAppSelector} from '../../hooks/use-store';
type props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Login = (props: props) => {
  const {navigation} = props;
  const dispatch = useAppDispatch();
  const state = useAppSelector(s => s?.user);

  const [values, setValues] = React.useState({
    email: '',
    password: '',
  });

  return (
    <View style={styles.container}>
      <AppHeader title="Sign-in" />
      <KeyboardAvoidScrollview
        contentContainerStyle={styles.contentContainerStyle}>
        <PrimaryInput
          keyboardType={'email-address'}
          placeholder='abc@gmail.com'
          label={'Email'}
          onChangeText={str => setValues({...values, email: str})}
          value={values.email}
        />
        <PrimaryInput
          secureTextEntry
          placeholder={'********'}
          label={'Password'}
          onChangeText={str => setValues({...values, password: str})}
          value={values.password}
        />
        <TouchableOpacity style={{alignSelf:'flex-end'}}>
          <Medium label={'Forgot password !'}/>
        </TouchableOpacity>
        <PrimaryButton
          disabled={!values?.email || !values?.password}
          title={'Login'}
          onPress={() =>
            dispatch(onLoginPress(values?.email, values?.password, props))
          }
          containerStyle={styles.button}
        />
        <Medium
          style={styles.accountText}
          onPress={() => props?.navigation?.navigate('Signup')}
          label={'Register an account'}
        />
      </KeyboardAvoidScrollview>
    </View>
  );
};
export default Login;
