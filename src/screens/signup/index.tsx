import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useFormik} from 'formik';
import React from 'react';
import {Image, View} from 'react-native';
import {signupFormValidation} from 'validations';
import {PrimaryButton} from '../../components/atoms/buttons';
import AppHeader from '../../components/atoms/headers/index';
import PrimaryInput from '../../components/atoms/inputs';
import {KeyboardAvoidScrollview} from '../../components/atoms/keyboard-avoid-scrollview';
import {useAppDispatch} from '../../hooks/use-store';
import {onSignupPress} from '../../services/firebase/firebase-actions';
import RootStackParamList from '../../types/navigation-types/root-stack';
import Medium from '../../typography/medium-text';
import styles from './styles';
import { logo } from 'assets/images';
import { mvs } from 'config/metrices';
import { Checkbox } from 'components/atoms/checkbox';
import { Row } from 'components/atoms/row';
import { colors } from 'config/colors';
import Regular from 'typography/regular-text';
type props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

const Signup = (props: props) => {
  const {navigation} = props;
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState(false);
  const [check,setCheck]=React.useState('admin')

  const initialValues = {
    name: '',
    email: '',
    password: '',

  };
  const {values, errors, touched, setFieldValue, setFieldTouched, isValid} =
    useFormik({
      initialValues: initialValues,
      validateOnBlur: true,
      validateOnChange: true,
      validate: signupFormValidation,
      onSubmit: () => {},
    });

  console.log('touched:=>', touched);
  console.log('errors:=>', errors);
  // if (isValid && Object.keys(touched).length > 0) {

  const onSubmit =()=>{
    try {
      
    } catch (error) {
      console.log('Error on Signup====>',error)
    }
  }

  return (
    <View style={styles.container}>
      <AppHeader back title="Sign-up" />
      <Image source={logo} style={{alignSelf:'center',marginTop:mvs(20),height:mvs(100),width:mvs(100)}}/>

      <KeyboardAvoidScrollview
        contentContainerStyle={styles.contentContainerStyle}>
        <PrimaryInput
        placeholder='Name'
          label={'Full Name'}
          onChangeText={str => setFieldValue('name', str)}
          value={values.name}
        />
        <PrimaryInput
        placeholder='abc@gmail.com'
          keyboardType={'email-address'}
          label={'Email'}
          onChangeText={str => setFieldValue('email', str)}
          value={values.email}
        />
        <PrimaryInput
          secureTextEntry
          placeholder={'********'}
          label={'Password'}
          onChangeText={str => setFieldValue('password', str)}
          onBlur={() => setFieldTouched('password', true)}
          value={values.password}
        />
       <View style={{marginTop:mvs(10)}}>
        <Medium label={'Signup with :'} color={colors.primary}/>
        <Row>

        <Row style={{width:'30%'}}>
          <Regular color={colors.primary} fontSize={mvs(16)} label={'Admin'}/>
          <Checkbox checked={check === 'admin' ? true:false} onPress={()=>setCheck('admin')}  />
        </Row>
        <Row style={{width:'40%'}}>
          <Regular color={colors.primary} fontSize={mvs(16)} label={'Blood Donor'}/>
          <Checkbox checked={check === 'user' ?true :false}onPress={()=>setCheck('user')} />
        </Row>
        </Row>
       </View>
        <PrimaryButton
          disabled={!values?.email || !values?.password || !values.name}
          title={'Signup'}
          loading={loading}
          onPress={() =>
            dispatch(
              onSignupPress(
                values?.name,
                values?.email,
                values?.password,
                setLoading,
                props,
              ),
            )
          }
          containerStyle={styles.button}
        />
        <Medium
          style={styles.accountText}
          onPress={props?.navigation?.goBack}
          label={'Already have an account'}
        />
      </KeyboardAvoidScrollview>
    </View>
  );
};
export default Signup;
