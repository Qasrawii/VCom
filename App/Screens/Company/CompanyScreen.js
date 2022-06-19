
import { Icon, FlatList } from 'native-base';
import React, { useEffect } from 'react';
import {
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useDimensions } from '@react-native-community/hooks'
import colors from '../../Assets/colors';
const CompanyScreen = ({ navigation }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const { width, height } = useDimensions().window
  const arr = [
    1, 2, 2, 2, 2
  ]
  const company={
    avatar:'PIC',
    name:"Tech-Inspire",
    rate:"5",
    numberOfRaters:"1",
    bio:"bio bio bio bio bio bio bio bio bio bio bio ",
    address:"Mnarah, Amman, Jordan",
    phoneNumber:'+962 7 9520 5848',
    email:"Info@tech-inspire.com",
    webSite:"tech-inspire.com",
    services:[
      "Mobile Apps",
      "Website",
      "ERP Systems"
    ],
    prevWork:[
      "Demo",
      "Demo",
      "Demo"
    ],
    team:[
      {
        name:"Mohammad Muhsen",
        rule:"Mobile Developer",
        avatar:"user"
        
      },
      {
        name:"Mohammad Qasrawi",
        rule:"Web Developer",
        avatar:"user"
        
      }
    ]

  }


  useEffect(() => {


  }, [])


  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: colors.primary20 }}>
    <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
    <View style={{ backgroundColor: colors.primary20, paddingVertical: 25, alignItems: 'center' }}>
      <TouchableOpacity style={{ height: width * 0.30, width: width * 0.30, backgroundColor: colors.primary, borderRadius: width * 0.8, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: colors.white, fontSize: 21 }}>
          {company.avatar}
        </Text>
      </TouchableOpacity>

    </View>


    <View style={{ backgroundColor: colors.white, paddingVertical: 30, paddingHorizontal: 20, borderTopRightRadius: 30, borderTopLeftRadius: 30 }}>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 15 }}>
        <Text style={{ fontSize: 19, color: colors.black, fontWeight: 'bold', paddingEnd: 10 }}>
          {company.name}
        </Text>
        <Text>
          <Icon as={FontAwesome5} size={4} name="star" mr="2" solid={true} color={colors.orange} w="4" />
        </Text>
        <Text style={styles.companyRate}>
          {company.rate}
        </Text>
      </View>

      <Text style={{ fontSize: 17, color: colors.black, }}>
        {company.bio}
      </Text>


      <TouchableOpacity onPress={()=>navigation.navigate("ChatScreen")} style={{ flex: 1, borderWidth: 1, borderColor: colors.primary, padding: 10, borderRadius: 10, marginVertical: 15, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: colors.black, fontSize: 17 }}>
          Message
        </Text>
      </TouchableOpacity>


      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 7, }}>
        <Icon as={FontAwesome5} size={4} name="map-marker-alt" mr="2" solid={true} color={colors.black} w="4" />
        <Text style={{ fontSize: 15, color: colors.black, fontWeight: 'bold' }}>
          {company.address}
        </Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 7, }}>
        <Icon as={FontAwesome5} size={4} name="mobile" mr="2" solid={true} color={colors.black} w="4" />
        <Text style={{ fontSize: 15, color: colors.black, fontWeight: 'bold' }}>
        {company.phoneNumber}

        </Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 7, }}>
        <Icon as={FontAwesome5} size={4} name="at" mr="2" solid={true} color={colors.black} w="4" />
        <Text style={{ fontSize: 15, color: colors.black, fontWeight: 'bold' }}>
        {company.email}

        </Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 7, }}>
        <Icon as={FontAwesome5} size={4} name="mouse-pointer" mr="2" solid={true} color={colors.black} w="4" />
        <Text style={{ fontSize: 15, color: colors.black, fontWeight: 'bold' }}>
        {company.webSite}

        </Text>
      </View>







      <View style={{ borderBottomColor: colors.lightGrey, borderBottomWidth: 1, marginVertical: 15 }} />
      <Text style={{ fontSize: 18, color: colors.black, fontWeight: 'bold' }}>
        Services :
      </Text>
    
      <FlatList data={company.services}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) =>
        <Text style={{ fontSize: 17, color: colors.black ,paddingVertical:3}}>
        {item}
        </Text>
        }
        keyExtractor={item => item.id}
        contentContainerStyle={{padding:10}} />


      <View style={{ borderBottomColor: colors.lightGrey, borderBottomWidth: 1, marginVertical: 15 }} />
      <Text style={{ fontSize: 18, color: colors.black, fontWeight: 'bold' }}>
        Worked with :
      </Text>


      <FlatList data={company.prevWork}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        renderItem={({ item,index }) =>
        <Text style={{ fontSize: 17, color: colors.black ,paddingVertical:3}}>
        {item}
        </Text>
        }
        keyExtractor={index => index}
        contentContainerStyle={{padding:10}} />
  


      <View style={{ borderBottomColor: colors.lightGrey, borderBottomWidth: 1, marginVertical: 15 }} />
      <Text style={{ fontSize: 18, color: colors.black, fontWeight: 'bold', marginVertical: 5 }}>
        Team :
      </Text>
      <FlatList data={company.team}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        renderItem={({ item,index }) =>
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.primary20, paddingHorizontal: 5, paddingVertical: 10, marginVertical: 7, borderRadius: 25 }}>
        <View style={styles.imageContainer} >
          <Text>
            <Icon as={FontAwesome5} name={item.avatar} size={8} color={colors.white} solid={true} />

          </Text>
        </View>

        <View style={{ paddingHorizontal: 10 }}>
          <Text style={{ fontSize: 19, color: colors.black, fontWeight: 'bold' }}>
            {item.name}
          </Text>
          <Text style={{ fontSize: 18, color: colors.black }}>
          {item.rule}

          </Text>
        </View>
      </View>
        }
        keyExtractor={index => index}
        contentContainerStyle={{padding:10}} />
    




    </View>



  </ScrollView>
  );
};



export default CompanyScreen;
const styles = StyleSheet.create({
  container: {
    padding: 15,
    margin: 10,
    borderRadius: 20,
    backgroundColor: colors.background,
    maxWidth: 180,
    alignItems: 'center'

  },
  imageContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.primary,
    marginHorizontal: 5,
    justifyContent:'center',
    alignItems:'center'
  },
  companyName: {
    fontSize: 15,
    color: colors.black,
    fontWeight: 'bold',
    marginHorizontal: 5
  },
  companyNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5
  },
  companyRate: {
    fontSize: 17,
    color: colors.black,
    fontWeight: 'bold'
  },
  companyBio: {
    fontSize: 15,
    color: colors.black
  }
});
