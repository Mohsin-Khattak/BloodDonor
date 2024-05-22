import {colors} from 'config/colors';
import {Platform} from 'react-native';
import {StyleSheet} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  subInnerContainer: {
    flex: 1,
    backgroundColor: colors.background,
    // backgroundColor: 'red',
    // paddingBottom: 20,
  },

  headerview: {
    width: responsiveWidth(100),
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: responsiveWidth(30),
    alignItems: 'center',
    alignSelf: 'center',
    paddingTop: responsiveHeight(4),
    paddingLeft: responsiveWidth(3),
  },
  headertext: {
    fontSize: responsiveFontSize(1.8),
    // fontFamily: fontFamily.appTextBold,
    color: 'black',
  },
  backicon: {
    height: responsiveWidth(7),
    width: responsiveWidth(7),
    resizeMode: 'contain',
    marginLeft: responsiveWidth(4),
    color: 'white',
    marginRight: responsiveWidth(3),
  },
  profilephoto: {
    borderRadius: responsiveWidth(50),
    // resizeMode: 'center',
  },
  profileimage: {
    height: responsiveWidth(11.5),
    width: responsiveWidth(11.5),
    marginLeft: responsiveWidth(3),
  },
  username: {
    // fontFamily: fontFamily.appTextRegular,
    fontSize: responsiveFontSize(2),
    color: 'white',
    marginLeft: responsiveWidth(3),
    top: responsiveHeight(0.1),
  },
  onlinetext: {
    fontSize: responsiveFontSize(1.2),
    color: 'white',
    marginLeft: responsiveWidth(4),
    // fontFamily: fontFamily.appTextRegular,
  },
  searchview: {
    backgroundColor: 'black',
    height: responsiveHeight(6),
    width: responsiveWidth(20),
    alignItems: 'flex-start',
    justifyContent: 'center',
    bottom: Platform.OS === 'ios' ? responsiveHeight(3.2) : null,
    paddingLeft: responsiveWidth(5),
    borderTopLeftRadius: responsiveWidth(10),
    borderBottomLeftRadius: responsiveWidth(10),
    position: 'absolute',
    right: 0,
  },
  headertopview: {
    justifyContent: 'center',
    paddingVertical: responsiveHeight(1.7),
  },
  dotview: {
    backgroundColor: '#00D523',
    height: responsiveWidth(3.2),
    width: responsiveWidth(3.2),
    borderRadius: responsiveWidth(4),
    borderWidth: responsiveWidth(0),
    borderColor: 'black',
    marginLeft: responsiveWidth(2.8),
    marginTop: responsiveHeight(0.5),
  },
  sendButton: {
    justifyContent: 'center',
    marginRight: responsiveWidth(3),
    marginBottom: responsiveHeight(1.5),
  },
  imagestyl: {
    height: responsiveHeight(30),
    width: responsiveWidth(50),
    backgroundColor: 'white',
    borderRadius: responsiveWidth(2),
  },
  smile: {
    height: responsiveHeight(3),
    width: responsiveWidth(3),
  },
  chatb: {
    height: responsiveHeight(8),
    width: responsiveWidth(8),
    marginLeft: responsiveWidth(2),
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: responsiveHeight(-2.5),
  },
  chatsend: {
    height: responsiveHeight(6),
    width: responsiveWidth(6),
    alignSelf: 'center',
    justifyContent: 'center',
    marginRight: responsiveWidth(3),
    // paddingTop:responsiveHeight(6),
  },
  messageTime: {
    color: 'gray',
    fontSize: responsiveFontSize(1.3),
    marginTop: responsiveHeight(0.5),
    marginLeft: responsiveWidth(1),
  },
  messageTime2: {
    color: 'gray',
    fontSize: responsiveFontSize(1.3),
    alignSelf: 'flex-end',
    marginTop: responsiveHeight(0.5),
    marginRight: responsiveWidth(2),
  },
});

export default styles;
