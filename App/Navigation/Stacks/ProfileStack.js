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
import ProfileScreen from '../../Screens/Profile/ProfileScreen';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import SignInScreen from '../../Screens/Auth/SignInScreen';
import SignUpScreen from '../../Screens/Auth/SignUpScreen';
const ProfileStack = createStackNavigator();

const ProfileStackScreen = ({ navigation, route }) => {

    const { width, height } = useDimensions().window
    const navName = getFocusedRouteNameFromRoute(route);

    useLayoutEffect(() => {
        switch (navName) {
            case "SignInScreen":
                navigation.setOptions({ tabBarVisible: false });
                break;
            case "SignUpScreen":
                navigation.setOptions({ tabBarVisible: false });
                break;
            default:
                navigation.setOptions({ tabBarVisible: true });

        }
        return;
    }, [navigation, route]);
    return (
        <ProfileStack.Navigator screenOptions={{
        }}>

            <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} options={({ navigation }) => ({
                headerShown: true,

            })} />
            <ProfileStack.Screen name="SignInScreen" component={SignInScreen} options={({ navigation }) => ({
                headerShown: false,

            })} />
            <ProfileStack.Screen name="SignUpScreen" component={SignUpScreen} options={({ navigation }) => ({
                headerShown: false,

            })} />

       




        </ProfileStack.Navigator>

    )
};
export default ProfileStackScreen