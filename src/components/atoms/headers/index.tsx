import { useNavigation } from '@react-navigation/native';
import React, { PureComponent } from 'react';
import { View, StyleProp, TextStyle, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../../config/colors';
import { mvs } from '../../../config/metrices';
import Bold from '../../../typography/bold-text';
import Regular from './../../../typography/regular-text';
type props = {
  style?: StyleProp<TextStyle>
  title?: string
  back?: boolean
}
const AppHeader = ({
  style,
  title,
  back,
  ...props
}: props) => {
  const navigation =useNavigation();
  return (
    <View style={[styles.container, style]}>
      {back && <TouchableOpacity style={styles.back} onPress={()=>navigation?.goBack()}>
        <Bold fontSize={mvs(20)} label={'<-'} />
      </TouchableOpacity>}
      <Bold style={[styles.title]} label={title} />
    </View>
  )
}
export default React.memo(AppHeader);
const styles = StyleSheet.create({
  container: {
    height: mvs(60),
    flexDirection: 'row',
    backgroundColor: colors.white,
    paddingHorizontal: mvs(22),
    borderBottomLeftRadius: mvs(20),
    borderBottomRightRadius: mvs(20),
    alignItems: 'center',
    zIndex: 1001,
    ...colors.shadow
  },
  title: {
    fontSize: mvs(18),
    color: colors.primary,
  },
  back:{
    marginRight:mvs(20),
  }
});