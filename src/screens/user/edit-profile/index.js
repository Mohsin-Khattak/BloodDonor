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

const EditProfile = props => {
  const {userInfo} = useAppSelector(s => s.user);
  const dispatch = useAppDispatch();
  const state = useAppSelector(s => s?.user);
  const [loading, setLoading] = React.useState(false);
  const [image, setImage] = React.useState(userInfo?.image || '');
  const initialValues = {
    name: userInfo?.name || '',
    email: userInfo?.email || '',
    address: userInfo?.address || '',
    city: userInfo?.city || '',
    phone: userInfo?.phone || '',
    image: image,
    bloodGroup: userInfo?.bloodGroup || '',
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
    console.log('values checck===>', values);
    try {
      dispatch(onUpdateProfile(values, setLoading, props));
    } catch (error) {
      console.log('Error on Signup====>', error);
    }
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
        <PrimaryInput
          placeholder="A"
          label={'Blood Group'}
          onChangeText={str => setFieldValue('bloodGroup', str)}
          value={values.bloodGroup}
        />
        <PrimaryInput
          placeholder="03448422399"
          keyboardType={'numeric'}
          label={'Phone'}
          onChangeText={str => setFieldValue('phone', str)}
          value={values.phone}
        />
        <PrimaryInput
          placeholder={'abc'}
          label={'Address'}
          onChangeText={str => setFieldValue('address', str)}
          onBlur={() => setFieldTouched('address', true)}
          value={values.address}
        />
        <PrimaryInput
          placeholder={'City'}
          label={'City'}
          onChangeText={str => setFieldValue('city', str)}
          onBlur={() => setFieldTouched('city', true)}
          value={values.city}
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
