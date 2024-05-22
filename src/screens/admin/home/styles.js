import {Platform, StyleSheet} from 'react-native';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  serachInput: {
    marginHorizontal: mvs(20),
    marginVertical: mvs(10),
    position: 'absolute',
    zIndex: 1,
    marginTop: mvs(80),
    width: '90%',
    flex: 1,
  },
});
export default styles;
