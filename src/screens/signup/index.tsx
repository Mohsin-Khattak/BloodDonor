import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFormik } from 'formik';
import React from 'react';
import { View } from 'react-native';
import { signupFormValidation } from 'validations';
import { PrimaryButton } from '../../components/atoms/buttons';
import AppHeader from '../../components/atoms/headers/index';
import PrimaryInput from '../../components/atoms/inputs';
import { KeyboardAvoidScrollview } from '../../components/atoms/keyboard-avoid-scrollview';
import { useAppDispatch } from '../../hooks/use-store';
import { onSignupPress } from '../../services/firebase/firebase-actions';
import RootStackParamList from '../../types/navigation-types/root-stack';
import Medium from '../../typography/medium-text';
import styles from './styles';
type props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

const Signup = (props: props) => {
  const { navigation } = props;
  const dispatch=useAppDispatch();
  const initialValues = {
    name:'',
    email: '',
    password: '',
  };
  const { values, errors, touched, setFieldValue, setFieldTouched, isValid } =
    useFormik({
      initialValues: initialValues,
      validateOnBlur: true,
      validateOnChange: true,
      validate: signupFormValidation,
      onSubmit: () => { },
    });

  console.log('touched:=>',touched);
  console.log('errors:=>',errors);
  // if (isValid && Object.keys(touched).length > 0) {

  return (
    <View style={styles.container}>
      <AppHeader back title="Sign-up" />
      <KeyboardAvoidScrollview contentContainerStyle={styles.contentContainerStyle}>
        <PrimaryInput  label={'Full Name'} onChangeText={(str) => setFieldValue('name', str)} value={values.name} />
        <PrimaryInput keyboardType={'email-address'} label={'Email'} onChangeText={(str) => setFieldValue('email', str)} value={values.email} />
        <PrimaryInput
          secureTextEntry
          placeholder={'********'}
          label={'Password'}
          onChangeText={(str) => setFieldValue('password', str)}
          onBlur={() => setFieldTouched('password', true)}
          value={values.password} />
        <PrimaryButton disabled={!values?.email||!values?.password||!values.name} title={'Signup'} onPress={() =>dispatch(onSignupPress(values?.name,values?.email,values?.password,props))} containerStyle={styles.button} />
        <Medium style={styles.accountText} onPress={props?.navigation?.goBack} label={'Already have an account'}/>
      </KeyboardAvoidScrollview>
    </View>

  );
};
export default Signup;
