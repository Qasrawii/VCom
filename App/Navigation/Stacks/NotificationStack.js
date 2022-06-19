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
import NotificationScreen from '../../Screens/Notification/NotificationScreen';
const NotificationStack = createStackNavigator();

const NotificationStackScreen = ({ navigation, route }) => {

    const { width, height } = useDimensions().window

    return (
        <NotificationStack.Navigator screenOptions={{
        }}>
        
            <NotificationStack.Screen name="NotificationScreen" component={NotificationScreen} options={({ navigation }) => ({
                headerShown: true,
                    
            })} />





        </NotificationStack.Navigator>

    )
};
export default NotificationStackScreen