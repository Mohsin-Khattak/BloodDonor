import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {StyleSheet} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(2),
  },
  contiueBtn: {
    width: responsiveWidth(90),
    height: responsiveHeight(6),
    marginTop: responsiveHeight(15),
    borderRadius: responsiveWidth(1),
  },
  checkEmailContent: {
    paddingHorizontal: responsiveWidth(5),
    marginTop: responsiveHeight(1),
    textAlign: 'center',
    color: colors.primary,
  },

  resetPassword: {
    fontSize: mvs(20),
    color: colors.primary,
    marginTop: responsiveHeight(8),
  },
  verifyEmailPic: {
    width: responsiveWidth(40.9),
    height: responsiveHeight(19.5),
    marginTop: responsiveHeight(30),
  },
});
