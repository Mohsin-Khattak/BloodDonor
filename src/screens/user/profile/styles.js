import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  profileImage: {
    width: mvs(150),
    height: mvs(150),
    borderRadius: mvs(100),
    alignSelf: 'center',
    marginTop: mvs(30),
  },
  inputContainer: {
    borderWidth: mvs(1),
    borderColor: colors.primary,
    paddingVertical: mvs(5),
    paddingHorizontal: mvs(20),
    borderRadius: mvs(5),
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: mvs(20),
  },
});
export default styles;
