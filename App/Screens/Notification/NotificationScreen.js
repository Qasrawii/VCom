
import { Icon, FlatList } from 'native-base';
import React, { useEffect } from 'react';
import {
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
  TouchableOpacity
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useDimensions } from '@react-native-community/hooks'
import colors from '../../Assets/colors';
import Carousel from 'react-native-snap-carousel';
import CompanyCard from '../../Components/Card/CompanyCard';
const NotificationScreen = ({ navigation }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const { width, height } = useDimensions().window
  const arr = [
    1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2
  ]



  useEffect(() => {


  }, [])


  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: colors.f2 }}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
       
        <FlatList data={arr}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) =>
          <TouchableOpacity style={{flexDirection:'row',alignItems:'center',borderBottomColor:colors.lightGrey,borderBottomWidth:1}}>
          <View style={{width:50,height:50,backgroundColor:colors.primary,justifyContent:'center',alignItems:'center',borderRadius:35,margin:10}}>
            <Text>
            <Icon as={FontAwesome5} name="user" size={5} color={colors.white} solid={true}/>
            </Text>
          </View>
          <Text style={{fontSize:17,color:colors.black,fontWeight:'bold'}}>
            Notification
          </Text>
          </TouchableOpacity>
          }
          keyExtractor={item => item.id} />
    </ScrollView>
  );
};



export default NotificationScreen;
