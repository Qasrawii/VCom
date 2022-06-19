/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import { NativeBaseProvider } from 'native-base';
 import React, { useEffect } from 'react';
 import {
   NavigationContainer,
 } from '@react-navigation/native';
import MainTabScreen from './App/Navigation/MainTabScreen';
 const App = () => {
   useEffect(() => {
  
 
   }, [])




   return (
     <NativeBaseProvider>
       <NavigationContainer>
         <MainTabScreen/>
       </NavigationContainer>
     </NativeBaseProvider>
 
   );
 };
 
 
 
 export default App;
 