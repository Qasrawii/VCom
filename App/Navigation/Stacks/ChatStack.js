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
import ChatListScreen from '../../Screens/Chat/ChatListScreen';
import ChatScreen from '../../Screens/Chat/ChatScreen';
const ChatStack = createStackNavigator();

const ChatStackScreen = ({ navigation, route }) => {

    const { width, height } = useDimensions().window

    return (
        <ChatStack.Navigator screenOptions={{
        }}>
          
         
            <ChatStack.Screen name="ChatListScreen" component={ChatListScreen} options={({ navigation }) => ({
                headerShown: true,
                title:"Inbox"
            })} />
            <ChatStack.Screen name="ChatScreen" component={ChatScreen} options={({ navigation }) => ({
                headerShown: true,
                
                    
            })} />





        </ChatStack.Navigator>

    )
};
export default ChatStackScreen