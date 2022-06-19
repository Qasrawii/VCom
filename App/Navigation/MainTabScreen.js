import React, { useState, useEffect, useContext, useLayoutEffect } from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeStack from './Stacks/HomeStack';
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import TabBar from './TabBar/TabBar'
import ChatStack from './Stacks/ChatStack';
import SearchStack from './Stacks/SearchStack';
import NotificationStack from './Stacks/NotificationStack';
import ProfileStack from './Stacks/ProfileStack';

const Tabs = createBottomTabNavigator();

const MainTabScreen = () => {



  return (

    <Tabs.Navigator
      initialRouteName="HomeTab"
      tabBar={props => <TabBar {...props} />}

    >
      <Tabs.Screen
        name="HomeTab"
        component={HomeStack}
        options={({ route, navigation }) => ({
          headerShown: null,
          tabBarLabel: "",
          tabBarIconType: FontAwesome5,
          tabBarIconTypeActive: FontAwesome5,
          tabBarIconName: 'home',
          tabBarIconNameActive: 'home',
          keyboardShown: false,
          hasCounter: false
        })}
      />




      <Tabs.Screen
        name="ChatTab"
        component={ChatStack}
        options={({ route, navigation }) => ({
          headerShown: null,
          tabBarLabel: "",
          tabBarIconType: FontAwesome5,
          tabBarIconTypeActive: FontAwesome5,
          tabBarIconName: 'comment',
          tabBarIconNameActive: 'comment',
          keyboardShown: false,
          hasCounter: false
        })}
      />

      <Tabs.Screen
        name="SearchTap"
        component={SearchStack}
        options={({ route, navigation }) => ({
          headerShown: null,
          tabBarLabel: "",
          tabBarIconType: FontAwesome5,
          tabBarIconTypeActive: FontAwesome5,
          tabBarIconName: 'search',
          tabBarIconNameActive: 'search',
          keyboardShown: false,
          hasCounter: false
        })}
      />

      <Tabs.Screen
        name="NotificationTap"
        component={NotificationStack}
        options={({ route, navigation }) => ({
          headerShown: null,
          tabBarLabel: "",
          tabBarIconType: FontAwesome5,
          tabBarIconTypeActive: FontAwesome5,
          tabBarIconName: 'bell',
          tabBarIconNameActive: 'bell',
          keyboardShown: false,
          hasCounter: false
        })}
      />

      <Tabs.Screen
        name="ProfileTap"
        component={ProfileStack}
        options={({ route, navigation }) => ({
          headerShown: null,
          tabBarLabel: "",
          tabBarIconType: FontAwesome5,
          tabBarIconTypeActive: FontAwesome5,
          tabBarIconName: 'user',
          tabBarIconNameActive: 'user',
          keyboardShown: false,
          hasCounter: false
        })}
      />

    </Tabs.Navigator >
  )
};

export default MainTabScreen;