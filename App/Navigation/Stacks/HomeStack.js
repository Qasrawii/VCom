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
import ChatScreen from '../../Screens/Chat/ChatScreen';
const HomeStack = createStackNavigator();

const HomeStackScreen = ({ navigation, route }) => {

    const { width, height } = useDimensions().window

    return (
        <HomeStack.Navigator screenOptions={{
        }}>
            <HomeStack.Screen name="Home" component={HomeScreen} options={({ navigation }) => ({
                headerShown: true,
                header: () => {
                    return (
                        <View style={{ alignItems: 'center', paddingVertical: 10, backgroundColor: colors.white }}>
                            <Image
                                source={require('../../Assets/logo.jpg')}
                                style={{ width: width * 0.45, height: 50 }}
                                resizeMode={'contain'}
                            />
                        </View>
                    )
                }
            })} />

            <HomeStack.Screen name="CompanyScreen" component={CompanyScreen} options={({ navigation,route }) => ({
                headerShown: true,
                title:route.params.item.name

            })} />
            <HomeStack.Screen name="CategoryScreen" component={CategoryScreen} options={({ navigation,route }) => ({
                headerShown: true,
                title:route.params.categoryName

            })} />
            <HomeStack.Screen name="ChatScreen" component={ChatScreen} options={({ navigation }) => ({
                headerShown: true,


            })} />




        </HomeStack.Navigator>

    )
};
export default HomeStackScreen