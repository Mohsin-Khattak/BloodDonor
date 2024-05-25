import {logo} from 'assets/images';
import {Checkbox} from 'components/atoms/checkbox';
import {Row} from 'components/atoms/row';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {useFormik} from 'formik';
import React from 'react';
import {Image, View, Text} from 'react-native';
import Regular from 'typography/regular-text';
import {signupFormValidation} from 'validations';
import {PrimaryButton} from '../../components/atoms/buttons';
import AppHeader from '../../components/atoms/headers/index';
import PrimaryInput, {InputWithIcon} from '../../components/atoms/inputs';
import {KeyboardAvoidScrollview} from '../../components/atoms/keyboard-avoid-scrollview';
import {useAppDispatch} from '../../hooks/use-store';
import {onSignupPress} from '../../services/firebase/firebase-actions';
import Medium from '../../typography/medium-text';
import styles from './styles';
import GoogleSearchBar from 'components/google-auto-place';

const Signup = props => {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = React.useState(false);
  const [check, setCheck] = React.useState('admin');
  const [selectGender, setSelectGender] = React.useState('male');
  const item = [
    {id: 1, title: 'A'},
    {id: 2, title: 'B'},
    {id: 3, title: 'AB'},
    {id: 4, title: 'O'},
  ];

  const initialValues = {
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    bloodGroup: '',
    isActive: '1',
  };

  const validate = values => {
    const errors = {};
    if (!values.name) errors.name = 'Name is required';
    if (!values.email) errors.email = 'Email is required';
    if (!values.password) errors.password = 'Password is required';
    if (!values.phone) errors.phone = 'Phone is required';
    if (!values.address) errors.address = 'Address is required';
    if (check === 'user' && !values.bloodGroup)
      errors.bloodGroup = 'Blood group is required';
    return errors;
  };

  const {
    values,
    errors,
    touched,
    setFieldValue,
    setFieldTouched,
    handleSubmit,
    setTouched,
  } = useFormik({
    initialValues: initialValues,
    validateOnBlur: true,
    validateOnChange: true,
    validate: validate,
    onSubmit: values => {
      setLoading(true);
      dispatch(
        onSignupPress(
          values.name,
          values.email,
          values.password,
          check, // role
          selectGender, // gender
          values.phone,
          values.address,
          values.bloodGroup,
          values.isActive,
          setLoading,
          props,
        ),
      ).catch(error => {
        console.log('Error on Signup====>', error);
        setLoading(false);
      });
    },
  });

  const handleAddress = (data, details) => {
    const {lat, lng} = details.geometry.location;
    let city = '';
    details.address_components.forEach(component => {
      if (component.types.includes('locality')) {
        city = component.long_name;
      }
    });

    if (!city) {
      details.address_components.forEach(component => {
        if (component.types.includes('sublocality')) {
          city = component.long_name;
        }
      });
    }

    setFieldValue('address', {
      latitudeDrop: lat,
      longitudeDrop: lng,
      address: details.formatted_address,
      city: city,
    });
  };

  const handleBloodGroupChange = title => {
    setFieldValue('bloodGroup', title);
  };

  const handleSignupPress = () => {
    setTouched({
      name: true,
      email: true,
      password: true,
      phone: true,
      address: true,
      bloodGroup: check === 'user',
    });
    handleSubmit();
  };

  return (
    <View style={styles.container}>
      <AppHeader back title="Sign-up" />
      <Image
        source={logo}
        style={{
          alignSelf: 'center',
          marginTop: mvs(20),
          height: mvs(100),
          width: mvs(100),
        }}
      />

      <KeyboardAvoidScrollview
        contentContainerStyle={styles.contentContainerStyle}>
        <View style={{marginTop: mvs(10)}}>
          <Medium label={'Signup with :'} color={colors.primary} />
          <Row>
            <Row style={{width: '30%'}}>
              <Regular
                color={colors.primary}
                fontSize={mvs(16)}
                label={'Admin'}
              />
              <Checkbox
                checked={check === 'admin'}
                onPress={() => setCheck('admin')}
              />
            </Row>
            <Row style={{width: '40%'}}>
              <Regular
                color={colors.primary}
                fontSize={mvs(16)}
                label={'Blood Donor'}
              />
              <Checkbox
                checked={check === 'user'}
                onPress={() => setCheck('user')}
              />
            </Row>
          </Row>
        </View>
        {check === 'user' ? (
          <PrimaryInput
            placeholder="Name"
            label={'Full Name'}
            onChangeText={str => setFieldValue('name', str)}
            value={values.name}
            onBlur={() => setFieldTouched('name', true)}
          />
        ) : (
          <PrimaryInput
            placeholder="Hospital Name"
            label={'Name'}
            onChangeText={str => setFieldValue('name', str)}
            value={values.name}
            onBlur={() => setFieldTouched('name', true)}
          />
        )}

        <PrimaryInput
          placeholder="abc@gmail.com"
          keyboardType={'email-address'}
          label={'Email'}
          onChangeText={str => setFieldValue('email', str)}
          value={values.email}
          onBlur={() => setFieldTouched('email', true)}
        />
        <PrimaryInput
          secureTextEntry
          placeholder={'********'}
          label={'Password'}
          onChangeText={str => setFieldValue('password', str)}
          onBlur={() => setFieldTouched('password', true)}
          value={values.password}
        />

        <PrimaryInput
          placeholder={'03448422399'}
          keyboardType={'numeric'}
          label={'Phone'}
          onChangeText={str => setFieldValue('phone', str)}
          onBlur={() => setFieldTouched('phone', true)}
          value={values.phone}
        />

        <GoogleSearchBar
          onPress={handleAddress}
          placeholder={'Search Address '}
        />

        {check === 'user' && (
          <>
            <InputWithIcon
              label="Please Select Blood Group"
              items={item}
              value={values.bloodGroup}
              id={values.bloodGroup}
              onChangeText={handleBloodGroupChange}
              onBlur={() => setFieldTouched('bloodGroup', true)}
            />
          </>
        )}
        {check === 'user' && (
          <>
            <Regular label={'Select Gender'} color={colors.primary} />
            <Row>
              <PrimaryButton
                title="Male"
                onPress={() => setSelectGender('male')}
                containerStyle={{
                  ...styles.genderContainerBtn,
                  backgroundColor:
                    selectGender === 'male' ? colors.primary : colors.white,
                }}
                textStyle={{
                  color:
                    selectGender === 'male' ? colors.white : colors.primary,
                }}
              />
              <PrimaryButton
                title="Female"
                onPress={() => setSelectGender('female')}
                containerStyle={{
                  ...styles.genderContainerBtn,
                  backgroundColor:
                    selectGender === 'female' ? colors.primary : colors.white,
                }}
                textStyle={{
                  color:
                    selectGender === 'female' ? colors.white : colors.primary,
                }}
              />
              <PrimaryButton
                title="Transgender"
                onPress={() => setSelectGender('transgender')}
                containerStyle={{
                  ...styles.genderContainerBtn,
                  backgroundColor:
                    selectGender === 'transgender'
                      ? colors.primary
                      : colors.white,
                }}
                textStyle={{
                  color:
                    selectGender === 'transgender'
                      ? colors.white
                      : colors.primary,
                }}
              />
            </Row>
          </>
        )}

        {/* Display error messages */}
        <View style={{marginTop: mvs(20)}}>
          {errors.name && touched.name && (
            <Text style={styles.errorText}>{errors.name}</Text>
          )}
          {errors.email && touched.email && (
            <Text style={styles.errorText}>{errors.email}</Text>
          )}
          {errors.password && touched.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}
          {errors.phone && touched.phone && (
            <Text style={styles.errorText}>{errors.phone}</Text>
          )}
          {errors.address && touched.address && (
            <Text style={styles.errorText}>{errors.address}</Text>
          )}
          {check === 'user' && errors.bloodGroup && touched.bloodGroup && (
            <Text style={styles.errorText}>{errors.bloodGroup}</Text>
          )}
        </View>

        <PrimaryButton
          disabled={loading}
          title={'Signup'}
          loading={loading}
          onPress={handleSignupPress}
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
