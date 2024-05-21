import {Platform, StyleSheet} from 'react-native';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  profileImage: {
    width: mvs(150),
    height: mvs(150),
    borderRadius: mvs(100),
  },
  cameraBtn: {
    position: 'absolute',
    alignSelf: 'flex-end',
    top: mvs(60),
    right: mvs(-10),
    zIndex: 1,
  },
  contentContainerStyle: {
    padding: mvs(20),
    paddingTop: mvs(50),
    marginBottom: mvs(20),
  },
  btnContainer: {
    width: mvs(60),
    height: mvs(25),
    borderWidth: mvs(1),
    borderRadius: mvs(12),
    borderColor: colors.primary,
  },
  toggleBtn: {
    width: mvs(25),
    height: mvs(23),
    borderRadius: mvs(10),
  },
});
export default styles;
