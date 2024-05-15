import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Image, View } from 'react-native';
import Config from 'react-native-config';
import { STORAGEKEYS } from '../../config/constants';
import { getUserData } from '../../services/firebase/firebase-actions';
import RootStackParamList from '../../types/navigation-types/root-stack';
import Regular from '../../typography/regular-text';
import { SERVICES } from '../../utils';
import { useAppDispatch, useAppSelector } from './../../hooks/use-store';
import styles from './styles';
import { splash } from 'assets/images';
import { mvs } from 'config/metrices';
type props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const Splash = (props: props) => {
  const {navigation} =props;
  const dispatch =useAppDispatch();
  const store =useAppSelector(s=>s);
  console.log('Config::',Config.BASE_URL);
  
  React.useEffect(() => {

    (async()=>{
      let screen:'Login'|'Home' = 'Login';
      SERVICES.getItem(STORAGEKEYS.userId).then((userId:any)=>{
      
        if(userId){
           screen='Home';
           dispatch(getUserData(userId));
        }
        setTimeout(() => {
          navigation?.replace(screen);
        }, 2000);
       })
    })()
  }, []);


  return (
    <View style={{...styles.container}}>
     <Image source={splash} style={{width:mvs(200),height:mvs(200)}}/>
    </View>
  );
};
export default Splash;
