import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Image, View } from 'react-native';
import RootStackParamList from '../../types/navigation-types/root-stack';
import styles from './styles';
type props = NativeStackScreenProps<RootStackParamList, 'Splash'>;
import Config from 'react-native-config';
import { useAppDispatch, useAppSelector } from './../../hooks/use-store';
import Regular from '../../typography/regular-text';
import { SERVICES } from '../../utils';
import { STORAGEKEYS } from '../../config/constants';
import { getUserData } from '../../services/firebase/firebase-actions';
// import { setLocation } from 'store/reducers/user-reducer';
import { splash } from 'assets/images';
import { mvs } from 'config/metrices';
import { setLocation } from 'store/reducers/user-reducer';



const Splash = (props: props) => {

  const {navigation} =props;
  const dispatch =useAppDispatch();

  const store =useAppSelector(s=>s);
  console.log('Config::',Config.BASE_URL);
  
  
  React.useEffect(() => {
    (async()=>{
      let screen:'Login'|'TabNavigator' = 'Login';
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
      SERVICES.getItem(STORAGEKEYS.userId).then((userId:any)=>{
      
        if(userId){
           screen='TabNavigator';
           dispatch(getUserData(userId));
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