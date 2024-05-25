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
        paddingTop:mvs(50),
    },
    button:{
        marginTop:mvs(20),
    },
    accountText:{
        color:colors.primary,
        alignSelf:'center',
        marginTop:mvs(20)
    },
    genderContainerBtn:{
        width:'30%',
        height:mvs(35),
        borderRadius:mvs(5),
        borderWidth:mvs(1),
        borderColor:colors.primary,
        
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: -10,
        marginBottom: 10,
      },

});
export default styles;