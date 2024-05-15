import { StyleSheet } from "react-native";
import { mvs } from "../../config/metrices";
import { colors } from './../../config/colors';

const  styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.white
    },
    contentContainerStyle:{
        flex:1,
        padding:mvs(20)
    }
});
export default styles;