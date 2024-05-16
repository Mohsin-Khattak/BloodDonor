import React from 'react';
import {Image, View} from 'react-native';
import {PrimaryButton} from '../../components/atoms/buttons';
import AppHeader from '../../components/atoms/headers/index';
import PrimaryInput from '../../components/atoms/inputs';
import {KeyboardAvoidScrollview} from '../../components/atoms/keyboard-avoid-scrollview';
import {useAppDispatch, useAppSelector} from '../../hooks/use-store';

import {handlePasswordReset} from 'services/firebase/firebase-actions';
import styles from './styles';
import {logo} from 'assets/images';
import {mvs} from 'config/metrices';

const Forgot = props => {
  const {navigation} = props;
  const dispatch = useAppDispatch();
  const state = useAppSelector(s => s?.user);
  const [loading, setLoading] = React.useState(false);
  const [values, setValues] = React.useState({
    email: '',
  });
  const onSubmit = () => {
    try {
      handlePasswordReset(values?.email, setLoading, props);
    } catch (error) {
      console.log('error==>', error);
    }
  };

  return (
    <View style={styles.container}>
      <AppHeader back title="Forgot" />
      <Image source={logo} style={styles.logoIcon} />
      <KeyboardAvoidScrollview
        contentContainerStyle={styles.contentContainerStyle}>
        <PrimaryInput
          keyboardType={'email-address'}
          placeholder="abc@gmail.com"
          label={'Email'}
          onChangeText={str => setValues({...values, email: str})}
          value={values.email}
        />

        <PrimaryButton
          disabled={!values?.email}
          loading={loading}
          title={'Next'}
          onPress={() => onSubmit()}
          containerStyle={styles.button}
        />
      </KeyboardAvoidScrollview>
    </View>
  );
};
export default Forgot;
