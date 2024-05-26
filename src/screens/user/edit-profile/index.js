import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './styles';
import AppHeader from '../../../components/atoms/headers/index';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {mvs} from 'config/metrices';
import {colors} from 'config/colors';
import {SERVICES, uploadImageFile} from '../../../utils';
import {KeyboardAvoidScrollview} from 'components/atoms/keyboard-avoid-scrollview';
import {useAppDispatch, useAppSelector} from 'hooks/use-store';
import {PrimaryButton} from '../../../components/atoms/buttons';
import PrimaryInput from '../../../components/atoms/inputs';
import {useFormik} from 'formik';
import {profileFormValidation, signupFormValidation} from 'validations';
import {onUpdateProfile} from 'services/firebase/firebase-actions';
import GoogleSearchBar from 'components/google-auto-place';
import {Row} from 'components/atoms/row';
import Bold from 'typography/bold-text';

const EditProfile = props => {
  const {userInfo} = useAppSelector(s => s.user);

  const dispatch = useAppDispatch();
  const state = useAppSelector(s => s?.user);
  const [loading, setLoading] = React.useState(false);
  const [image, setImage] = React.useState(userInfo?.image || '');
  const [isActive, setIsActive] = React.useState(userInfo?.isActive === '1');
  const initialValues = {
    name: userInfo?.name || '',
    email: userInfo?.email || '',
    address: {
      address: userInfo?.address?.address || '',
      latitudeDrop: userInfo?.address?.latitudeDrop || '',
      longitudeDrop: userInfo?.address?.longitudeDrop || '',
      city: userInfo?.address?.city || '',
    },
    phone: userInfo?.phone || '',
    image: image,
    bloodGroup: userInfo?.bloodGroup || '',
    role: userInfo?.role,
    isActive: userInfo?.isActive || '0',
  };
  const {values, errors, touched, setFieldValue, setFieldTouched, isValid} =
    useFormik({
      initialValues: initialValues,
      validateOnBlur: true,
      validateOnChange: true,
      validate: profileFormValidation,
      onSubmit: () => {},
    });

  console.log('touched:=>', touched);
  console.log('errors:=>', errors);
  // if (isValid && Object.keys(touched).length > 0) {

  const onSubmit = () => {
    try {
      dispatch(onUpdateProfile(values, setLoading, props));
    } catch (error) {
      console.log('Error on Signup====>', error);
    }
  };
  const handleAddress = (data, details) => {
    console.log('address details check===>', details);

    // Extract latitude and longitude from details.geometry.location
    const {lat, lng} = details.geometry.location;

    // Extract the city name from address_components
    let city = '';
    details.address_components.forEach(component => {
      if (component.types.includes('locality')) {
        city = component.long_name;
      }
    });

    // Fallback to sublocality if locality is not found
    if (!city) {
      details.address_components.forEach(component => {
        if (component.types.includes('sublocality')) {
          city = component.long_name;
        }
      });
    }

    // Determine whether this is for pickup or dropoff
    setFieldValue('address', {
      latitudeDrop: lat,
      longitudeDrop: lng,
      address: details.formatted_address,
      city: city,
    });
  };

  const onpenGallery = async () => {
    try {
      const res = await SERVICES._returnImageGallery();
      const uri = await uploadImageFile(res.uri);
      console.log('image uri===>', uri);
      setImage(uri);
      setFieldValue('image', uri);
    } catch (error) {
      console.log('upload image error', error);
    }
  };
  const toggleIsActive = () => {
    setIsActive(prev => !prev); // Toggle isActive state
    setFieldValue('isActive', isActive ? '0' : '1'); // Update formik values
  };

  return (
    <View style={styles.container}>
      <AppHeader back title="Edit Profile" />
      <View style={{marginTop: mvs(30), alignSelf: 'center'}}>
        <TouchableOpacity
          onPress={() => onpenGallery()}
          style={styles.cameraBtn}>
          <AntDesign name={'camera'} size={mvs(25)} color={colors.primary} />
        </TouchableOpacity>

        <Image
          source={{
            uri:
              //   user?.profileImage ||
              image ||
              'https://t3.ftcdn.net/jpg/01/18/01/98/360_F_118019822_6CKXP6rXmVhDOzbXZlLqEM2ya4HhYzSV.jpg',
          }}
          style={styles.profileImage}
        />
      </View>
      <KeyboardAvoidScrollview
        contentContainerStyle={styles.contentContainerStyle}>
        <PrimaryInput
          placeholder="Name"
          label={'Full Name'}
          onChangeText={str => setFieldValue('name', str)}
          value={values.name}
        />
        <PrimaryInput
          editable={false}
          placeholder="abc@gmail.com"
          keyboardType={'email-address'}
          label={'Email'}
          onChangeText={str => setFieldValue('email', str)}
          value={values.email}
        />
        {/* {userInfo?.role === 'user' && (
          <PrimaryInput
            placeholder="A"
            label={'Blood Group'}
            onChangeText={str => setFieldValue('bloodGroup', str)}
            value={values.bloodGroup}
          />
        )} */}
        <PrimaryInput
          placeholder="03448422399"
          keyboardType={'numeric'}
          label={'Phone'}
          onChangeText={str => setFieldValue('phone', str)}
          value={values.phone}
        />
        {userInfo?.role === 'user' && (
          <Row style={{alignItems: 'center', paddingVertical: mvs(10)}}>
            <Bold label={'Donate Blood'} color={colors.primary} />
            <TouchableOpacity
              onPress={() => toggleIsActive()}
              style={styles.btnContainer}>
              <View
                style={{
                  ...styles.toggleBtn,
                  backgroundColor: isActive ? 'green' : 'red', // Adjust colors as needed
                  alignSelf: isActive ? 'flex-end' : 'flex-start',
                }}
              />
            </TouchableOpacity>
          </Row>
        )}
        <GoogleSearchBar
          onPress={handleAddress}
          placeholder={'Change Address '}
        />
        <PrimaryButton
          loading={loading}
          onPress={() => onSubmit()}
          title="Update"
        />
      </KeyboardAvoidScrollview>
    </View>
  );
};
export default EditProfile;
