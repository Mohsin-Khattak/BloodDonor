import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  mapContainer: {
    height: mvs(450),
  },
  btnContainer: {
    width: '45%',
    height: mvs(40),
    borderRadius: mvs(5),
  },
});
export default styles;
