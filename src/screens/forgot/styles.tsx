import { StyleSheet } from "react-native";
import { mvs } from "../../config/metrices";
import { colors } from '../../config/colors';

const  styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.white
    },
    contentContainerStyle:{
        padding:mvs(20),
        paddingTop:mvs(100),
    },
    button:{
        marginTop:mvs(100),
    },
    accountText:{
        color:colors.primary,
        alignSelf:'center',
        marginTop:mvs(20)
    },
    logoIcon:{
        alignSelf: 'center',
        marginTop: mvs(50),
        height: mvs(100),
        width: mvs(100),
      }
});
export default styles;