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
import Search from '../../Screens/Search/Search';

const SearchStack = createStackNavigator();

const SearchStackScreen = ({ navigation, route }) => {

    const { width, height } = useDimensions().window

    return (
        <SearchStack.Navigator screenOptions={{
        }}>

            <SearchStack.Screen name="SearchScreen" component={SearchScreen} options={({ navigation }) => ({
                headerShown: false,

            })} />
            <SearchStack.Screen name="Search" component={Search} options={({ navigation }) => ({
                headerShown: false,

            })} />
            <SearchStack.Screen name="ChatScreen" component={ChatScreen} options={({ navigation }) => ({
                headerShown: true,


            })} />
            <SearchStack.Screen name="CompanyScreen" component={CompanyScreen} options={({ navigation ,route }) => ({
                headerShown: true,
                title:route.params.item.name


            })} />
            <SearchStack.Screen name="CategoryScreen" component={CategoryScreen} options={({ navigation,route }) => ({
                headerShown: true,
                title:route.params.categoryName
            })} />



        </SearchStack.Navigator>

    )
};
export default SearchStackScreen