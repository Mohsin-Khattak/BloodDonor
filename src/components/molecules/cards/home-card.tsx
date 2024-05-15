import { useNavigation } from '@react-navigation/native';
import React, { PureComponent } from 'react';
import { View, StyleProp, TextStyle, StyleSheet } from 'react-native';
import { Complete } from '../../../assets/icons';
import { colors } from '../../../config/colors';
import { mvs } from '../../../config/metrices';
import Bold from '../../../typography/bold-text';
import Medium from '../../../typography/medium-text';
import Regular from '../../../typography/regular-text';
import { Row } from '../../atoms/row';
type props ={
    style?: StyleProp<TextStyle>
    title?:string
    time?:string
    description?:string
    isComplete?:boolean
    onEditPress:()=>void
    onDeletePress:()=>void
}
 const HomeCard =({
style,
time='04:00 pm',
title='task title',
description='Here is description',
onEditPress,
onDeletePress,
}:props)=>{
  return(
    <View style={[styles.container]}>
      <View style={styles.icon}>
        <Complete height={mvs(20)} width={mvs(20)}/>
      </View>
      <View style={styles.left}>
        <Regular style={[styles.time]} label={time}/>
        <Bold style={[styles.title]} label={title}/>
        <Regular style={[styles.time]} label={description}/>
      </View>
      <Row style={styles.middle}>
        <Medium onPress={onEditPress} style={[styles.edit]} label={'Edit'}/>
        <Medium onPress={onDeletePress} style={[styles.edit]} label={'Delete'}/>
      </Row>
      <View style={styles.right}>
        <Bold style={[styles.title]} label={title}/>
      </View>
    </View>
  )
}
export default React.memo(HomeCard);
const styles = StyleSheet.create({
   container:{
     height:mvs(100),
     flexDirection:'row',
     justifyContent:'space-between',
     backgroundColor:colors.white,
     marginVertical:mvs(10),
     borderTopLeftRadius:mvs(40),
     borderBottomRightRadius:mvs(40),
     overflow:'hidden',
     ...colors.shadow
   },
   title:{
    fontSize:mvs(15),
    color:colors.primary,
   },
   icon:{
    width:mvs(40),
    justifyContent:'center',
    alignItems:'center',
    height:'100%',
   },
   left:{
    flex:1,
    backgroundColor:colors.white,
    padding:mvs(15)
   },
   middle:{
    width:mvs(120),
    padding:mvs(15),
    height:'100%',
   },
   right:{
    width:mvs(40),
    padding:mvs(15),
    height:'100%',
    backgroundColor:colors.primary
   },
   edit:{
    fontSize:mvs(12),
    color:colors.border,
   },
   time:{
    fontSize:mvs(12),
    color:colors.border,
   }
});