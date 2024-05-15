import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import moment from 'moment';
import { Platform, Share } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import uuid from 'react-native-uuid';
import { NavigationProps } from '../types/navigation-types';
// import Geolocation from 'react-native-geolocation-service';
import RootStackParamList from '../types/navigation-types/root-stack';

export const horizontalAnimation: any = {
  headerShown: false,
  gestureDirection: 'horizontal',
  cardStyleInterpolator: ({ current, layouts }: any) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};

// const hasPermissionIOS = async () => {
//   const status = await Geolocation.requestAuthorization('whenInUse');

//   if (status === 'granted') {
//     return true;
//   }

//   if (status === 'denied') {
//     Alert.alert('Permission denied');
//   }

//   if (status === 'disabled') {
//     Alert.alert('Permission disabled');
//   }

//   return false;
// };
export const SERVICES = {
  resetStack: (props: NavigationProps, routeName: string,params?:object) => {
    props?.navigation.dispatch(
      CommonActions.navigate({
        name: routeName,
        params
      })
    );
  },
  getItem: async (key: string) => {
    try {
      const res = await AsyncStorage.getItem(key);
      return res;
    } catch (error) {
      console.log('error=>', error);
      return null;
    }
  },
  setItem: async (key: string, data: string) => {
    try {
      await AsyncStorage.setItem(key, data);
    } catch (error) {
      console.log('error=>', error);
      return null;
    }
  },
  getFormData: (object: any) => {
    const formData = new FormData();
    Object.keys(object).forEach(key => formData.append(key, object[key]));
    return formData;
  },
  _returnError: (error: any) => {
    console.log('type of code: ', error?.code);
    console.log('type of message: ', error?.message);
    if (typeof error === 'string') {
      return error;
    }
    return error?.message || error?.code;
  },
  _capitalizeFirst: (str: string) => str?.charAt(0)?.toUpperCase() + str?.slice(1),
  _returnStringify: (data: object) => JSON.stringify(data),
  _share: async (description = '', url: string) => {
    try {
      console.log('url::', url);
      const result = await Share.share({
        // message:description?description:url,
        // url: url,
        message: description, // + ' ' + createText(description),
        url: url,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      // console.log(error.message);
    }
  },
  // _get_current_location: async (
  //   onSuccess = (position:any) => {},
  //   onError = (error:any) => {},
  // ) => {
  //   try {
  //     const flag = await SERVICES._requestLocationPermission();
  //     if (flag) {
  //       Geolocation.getCurrentPosition(onSuccess, onError, {
  //         enableHighAccuracy: true,
  //         timeout: 15000,
  //         maximumAge: 10000,
  //       });
  //     }
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // },

  _returnAddress: (addressObject: any) => {
    console.log('addressObject:', addressObject.results[0]);
    let returnAddress = {
      street_number: null,
      street_address: null,
      fulladdress: addressObject?.results[0]?.formatted_address,
      geoCode: {
        ...addressObject.results[0]?.geometry?.location,
      },
      place_id: addressObject.results[0]?.place_id,
      province: null,
      district: null,
      tehsil: null,
      city: null,
      area: null,
      country: null,
      country_short_name: null
    };
    addressObject.results?.forEach((element: any) => {
      element?.address_components?.forEach((item: any) => {
        if (item.types.some((el: any) => el === 'administrative_area_level_1')) {
          returnAddress = { ...returnAddress, province: item.long_name };
        } else if (
          item.types.some((el: any) => el === 'administrative_area_level_2')
        ) {
          returnAddress = { ...returnAddress, district: item.long_name };
        } else if (
          item.types.some((el: any) => el === 'administrative_area_level_3')
        ) {
          returnAddress = { ...returnAddress, tehsil: item.long_name };
        } else if (item.types.some((el: any) => el === 'locality')) {
          returnAddress = { ...returnAddress, city: item.long_name };
        } else if (item.types.some((el: any) => el === 'sublocality')) {
          returnAddress = { ...returnAddress, area: item.long_name };
        } else if (item.types.some((el: any) => el === 'street_address')) {
          returnAddress = {
            ...returnAddress,
            street_address: item.long_name || null,
          };
        } else if (item.types.some((el: any) => el === 'street_number')) {
          returnAddress = {
            ...returnAddress,
            street_number: item.long_name || null,
          };
        } else if (item.types.some((el: any) => el === 'country')) {
          returnAddress = {
            ...returnAddress,
            country: item.long_name || null,
            country_short_name: item?.short_name,
          };
        }
      });
    });
    return returnAddress;
  },
  // _requestLocationPermission: async () => {
  //   try {
  //     if (Platform.OS === 'ios') {
  //       const hasPermission = await hasPermissionIOS();
  //       return hasPermission;
  //     }
  //     if (Platform.OS === 'android' && Platform.Version < 23) {
  //       return true;
  //     }

  //     const hasPermission = await PermissionsAndroid.check(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //     );

  //     if (hasPermission) {
  //       return true;
  //     }

  //     const status = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //     );

  //     if (status === PermissionsAndroid.RESULTS.GRANTED) {
  //       return true;
  //     }

  //     if (status === PermissionsAndroid.RESULTS.DENIED) {
  //       ToastAndroid.show('Permission denied', ToastAndroid.LONG);
  //     } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
  //       ToastAndroid.show('Permission disabled', ToastAndroid.LONG);
  //     }
  //     return false;
  //   } catch (err) {
  //     console.log(err);
  //     return false;
  //   }
  // },
  serialize: (obj: any) => {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
      }
    return str.join('&');
  },
  _removeEmptyKeys: (payload: any) => {
    const obj = payload;
    Object.keys(obj).forEach(key => {
      if (obj[key] === undefined || obj[key] === null) {
        delete obj[key];
      }
    });
    return obj;
  },
  _returnImageCamera: async () => {
    try {
      let image = await ImagePicker.openCamera({
        width: 1000,
        height: 800,
        cropping: true,
        includeBase64: false,
        compressImageQuality: 0.5,
        compressImageMaxWidth: 1500,
        compressImageMaxHeight: 1000,
      });
      return {
        uri:
          Platform.OS === 'android'
            ? image?.path
            : image?.path.replace('file://', ''),
        name: image?.filename,
        type: image?.mime,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  },
  _returnImageGallery: async () => {
    try {

      let image = await ImagePicker.openPicker({
        width: 1000,
        height: 800,
        cropping: true,
        includeBase64: false,
        compressImageQuality: 0.5,
        compressImageMaxWidth: 1500,
        compressImageMaxHeight: 1000,
      });
      return {
        uri:
          Platform.OS === 'android'
            ? image?.path
            : image?.path.replace('file://', ''),
        name: image?.filename,
        type: image?.mime,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  },
  getMinutesDiff: (a: string, b: string) => moment(b).diff(a, 'm'),
  getUUID: () => uuid?.v4()?.toString(),
};
