import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Alert, Image, TouchableOpacity, View} from 'react-native';
import {KeyboardAvoidScrollview} from '../../components/atoms/keyboard-avoid-scrollview';
import {PrimaryButton} from '../../components/atoms/buttons';
import AppHeader from '../../components/atoms/headers/index';
import PrimaryInput from '../../components/atoms/inputs';
import RootStackParamList from '../../types/navigation-types/root-stack';
import styles from './styles';
import {onLoginPress} from '../../services/firebase/firebase-actions';
import Medium from '../../typography/medium-text';
import {useAppDispatch, useAppSelector} from '../../hooks/use-store';
import { logo } from 'assets/images';
import { mvs } from 'config/metrices';
import { SERVICES } from '../../utils';
import Geocoder from 'react-native-geocoding';

type props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Login = (props: props) => {
  Geocoder.init('AIzaSyDGDrN2RHbsqaNEuO0mCN3-MaqtzHgFgmA');

  const {navigation} = props;
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState(false);
  const state = useAppSelector(s => s?.user);

  const [values, setValues] = React.useState({
    email: '',
    password: '',
  });

  const handleLoginPress = () => {
    if (!values.email ) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }else if( !values.password)
    {
      Alert.alert('Error', 'Please enter password.');
      return;
    }
    dispatch(onLoginPress(values.email, values.password, setLoading, props));
  };

  return (
    <View style={styles.container}>
      <AppHeader title="Sign-in" />
      <Image source={logo} style={{alignSelf: 'center', marginTop: mvs(50), height: mvs(100), width: mvs(100)}} />
      <KeyboardAvoidScrollview contentContainerStyle={styles.contentContainerStyle}>
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
        <TouchableOpacity onPress={() => navigation.navigate('Forgot')} style={{alignSelf: 'flex-end'}}>
          <Medium label={'Forgot password !'} />
        </TouchableOpacity>
        <PrimaryButton
          disabled={loading}
          loading={loading}
          title={'Login'}
          onPress={handleLoginPress}
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
