
import { Icon, FlatList, Input } from 'native-base';
import React, { useEffect } from 'react';
import {
    Text,
    useColorScheme,
    View,
} from 'react-native';
import { useDimensions } from '@react-native-community/hooks'
import colors from '../../Assets/colors';
const ChatScreen = ({ navigation }) => {
    const isDarkMode = useColorScheme() === 'dark';
    const { width, height } = useDimensions().window
    const arr = [
        1, 2, 2, 2, 2
    ]



    useEffect(() => {


    }, [])


    return (
        <View showsVerticalScrollIndicator={false} style={{ backgroundColor: colors.f2,flex:1}}>
          
            <View style={{flex:1}} >
            <View style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
                <Text style={{ color: colors.black, fontSize: 17, backgroundColor: colors.lightGrey, margin: 10, padding: 15, borderBottomRightRadius: 20, borderTopRightRadius: 20, borderBottomLeftRadius: 20 }} >
                    hi
                </Text>
            </View>

            <View style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
                <Text style={{ color: colors.white, fontSize: 17, backgroundColor: colors.primary, margin: 10, padding: 15, borderTopLeftRadius: 20, borderTopRightRadius: 20, borderBottomLeftRadius: 20 }} >
                    hi
                </Text>
            </View>
            



            </View>

            <View style={{backgroundColor:colors.white,marginHorizontal:10,borderRadius:20,marginBottom:10}}>
                <Input
                w={{ base: "100%" }}
                    InputRightElement={
                        <Text style={{color:colors.primary,fontSize:15,paddingHorizontal:10}}>Send</Text>
                    }
                    placeholder="Message..."
                    variant="rounded" />
            </View>

        </View>
    );
};



export default ChatScreen;
