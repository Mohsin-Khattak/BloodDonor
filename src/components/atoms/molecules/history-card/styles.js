import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    // height: mvs(260),
    marginTop: mvs(20),
    shadowColor: '#000',
    borderRadius: mvs(10),

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  backGroundImage: {
    width: mvs(150),
    height: mvs(150),
    borderWidth: 1,

    borderTopLeftRadius: mvs(10),
    borderBottomLeftRadius: mvs(10),
  },
  // innerImage: {width: '100%', height: '100%', borderRadius: mvs(10)},
  innerContainer: {
    // paddingVertical: mvs(10),
    // paddingHorizontal: mvs(10),
    marginLeft: mvs(10),
  },
  rowContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: mvs(10),
  },
});
export default styles;
