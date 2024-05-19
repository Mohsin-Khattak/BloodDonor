import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Image, View } from 'react-native';
import Config from 'react-native-config';
import { STORAGEKEYS } from '../../config/constants';
import { getUserData } from '../../services/firebase/firebase-actions';
import RootStackParamList from '../../types/navigation-types/root-stack';
import { SERVICES } from '../../utils';
import { useAppDispatch, useAppSelector } from './../../hooks/use-store';
import styles from './styles';
type props = NativeStackScreenProps<RootStackParamList, 'Splash'>;
// import { setLocation } from 'store/reducers/user-reducer';
import { splash } from 'assets/images';
import { mvs } from 'config/metrices';
import { setLocation } from 'store/reducers/user-reducer';



const Splash = (props: props) => {
  const {navigation} =props;
  const dispatch =useAppDispatch();

  const {userInfo} =useAppSelector(s=>s.user);
  console.log('Config::',Config.BASE_URL);

  
  React.useEffect(() => {
    (async()=>{
      let screen:'Login'|'TabNavigator'|'HospitalStack' = 'Login';
      SERVICES.get_current_location(
        position => {
          dispatch(
            setLocation({
              latitude: position?.coords?.latitude,
              longitude: position?.coords?.longitude,
            }),
          );
        },
        error => {},
      );
      let role = await SERVICES.getItem(STORAGEKEYS.role);
      SERVICES.getItem(STORAGEKEYS.userId).then((userId:any)=>{
      
        if(userId){
          if(role ==='user')
          {
            screen='TabNavigator';
            dispatch(getUserData(userId));
          }else
          {

            screen='HospitalStack';
            dispatch(getUserData(userId));
          }
        }
        setTimeout(() => {
          navigation?.replace(screen);
        }, 3000);
       })
    })()
  }, []);


  return (
    <View style={{...styles.container}}>
      {/* <Regular style={styles.welcomeText} label={'Welcome to to-do'}/>/
       */}
       <Image style={{width:mvs(200),height:mvs(200)}} source={splash}/>
    </View>
  );
};
export default Splash;



// const Loading = async () => {

//   let userId = await storageServices.getKey('userId');
//   setTimeout(async () => {

//     if (userId) {
//       if (userType == 'buyer') {
//         navigation.replace('BuyerApp', {screen: 'App'});
//       } else {
//         navigation.replace('SellerApp', {screen: 'App'});
//       }
//     } else {
//       navigation.replace('SellerApp', {screen: 'App'});
//       // navigation.replace('Welcome');
//     }
//   }, 1500);
// };