import { StyleSheet } from "react-native";
import colors from "../../Assets/colors";
export const TabStyles = StyleSheet.create({
    Container:{
        flexDirection: 'row',
        // backgroundColor: colors.green,
        height:'8%',
        alignItems:'center',
        justifyContent:'center',
        borderTopWidth:1,
        borderTopColor:colors.f2
    },
    Block:{
        flex: 1,
        height:'100%',
        alignItems:'center',
        justifyContent: 'center', 
        // marginHorizontal:5,
    },
    Title:{
        color:colors.lightBlack,
        fontSize:10,
        fontFamily:'Montserrat-SemiBold'
    },
    TitleActive:{
        color:colors.primary,
        fontSize:10,
        fontFamily:'Montserrat-SemiBold'
    },
    Icon:{
        color:   colors.lightBlack,
    },
    IconActive:{
        color:  colors.primary ,
    }
})