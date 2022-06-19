import React, { useContext, useLayoutEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../Screens/Home/HomeScreen';
import { Dimensions, Image } from 'react-native';
import { Icon, Text, View } from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useDimensions } from '@react-native-community/hooks'
import colors from '../../Assets/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CompanyScreen from '../../Screens/Company/CompanyScreen'
import CategoryScreen from '../../Screens/Category/CategoryScreen';
import SearchScreen from '../../Screens/Search/SearchScreen';
import ChatScreen from '../../Screens/Chat/ChatScreen';

const SearchStack = createStackNavigator();

const SearchStackScreen = ({ navigation, route }) => {

    const { width, height } = useDimensions().window

    return (
        <SearchStack.Navigator screenOptions={{
        }}>
         
            <SearchStack.Screen name="SearchScreen" component={SearchScreen} options={({ navigation }) => ({
                headerShown: true,
                header: () => {
                    return (
                        <View style={{ alignItems: 'center', paddingVertical: 10, backgroundColor: colors.white }}>
                            <TouchableOpacity onPress={()=>null} style={{flexDirection:'row',alignItems:'center',paddingVertical:10,paddingHorizontal:20,backgroundColor:colors.f2,minWidth:width*.9,borderRadius:25}}>
                            <Icon as={FontAwesome5} name="search" mr="5" color={colors.grey} size={4} />
                            <Text style={{fontSize:16,color:colors.grey,}}   >
                                Sreach...
                            </Text>
                            </TouchableOpacity>
                        </View>
                    )
                }
            })} />
            <SearchStack.Screen name="ChatScreen" component={ChatScreen} options={({ navigation }) => ({
                headerShown: true,


            })} />




        </SearchStack.Navigator>

    )
};
export default SearchStackScreen