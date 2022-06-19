
import { Icon, FlatList, Image } from 'native-base';
import React, { useEffect, useState } from 'react';
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
import Carousel from 'react-native-snap-carousel';
import CompanyCard from '../../Components/Card/CompanyCard';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import {  
  launchCamera,
  launchImageLibrary
} from 'react-native-image-picker';
const ProfileScreen = ({ navigation }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const { width, height } = useDimensions().window
  const [filePath, setFilePath] = useState();
  const [company, setCompany] = useState({});
  

  const arr = [
    1, 2, 2, 2, 2
  ]


  const chooseFile = async () => {

    let options = {
      mediaType: 'mixed',
      quality: 1,
      selectionLimit: 0,


    };
    launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      let result = response.assets[0]
      console.log('result', result)
      setFilePath(result.uri);
    });
  };

  useEffect(() => {
    if (auth().currentUser != null)
      getCompany()
    console.log("shaker", auth().currentUser)
    console.log("shakerd")
    console.log('company', company)
    

  }, [auth().currentUser])

  const getCompany =async () => {
    const Company =await  firestore().collection('companies').doc(auth().currentUser._user.uid)
      .onSnapshot(documentSnapshot => setCompany(documentSnapshot.data()))



  }


  const signOut = () => {
    auth()
      .signOut()
      .then(() => console.log("shaker", auth().currentUser._user.uid)).then(
        setCompany({})
      );

  }
  if (auth().currentUser != null)
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: colors.primary20 }}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <View style={{ backgroundColor: colors.primary20, paddingVertical: 25, alignItems: 'center' }}>
          <TouchableOpacity onPress={() => chooseFile()}
            style={{ padding: 5, backgroundColor: colors.white, height: width * 0.30, width: width * 0.30, borderWidth: 1, borderColor: colors.lightGrey, borderRadius: width * 0.8, justifyContent: 'center', alignItems: 'center' }}>
            <Image
              // source={require('../../Assets/logo.jpg')}
              source={{ uri: "file:///data/user/0/com.vcom/cache/rn_image_picker_lib_temp_99625ad7-fabf-421a-a736-b13af984b372.jpg" }}
              style={{ width: width * 0.60, height: 50, marginVertical: 30 }}
              resizeMode={'cover'}
            />

          </TouchableOpacity>


        </View>

        <View style={{ backgroundColor: colors.white, paddingVertical: 30, paddingHorizontal: 20, borderTopRightRadius: 30, borderTopLeftRadius: 30 }}>


          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.lightGrey }}>
            <Text style={{ fontSize: 16, color: colors.black, fontWeight: 'bold' }}>
              0 Posts
            </Text>
            <Text style={{ fontSize: 20, color: colors.grey, fontWeight: 'bold' }}>
              |
            </Text>
            <Text style={{ fontSize: 16, color: colors.black, fontWeight: 'bold' }}>
              0 Likers
            </Text>
            <Text style={{ fontSize: 20, color: colors.grey, fontWeight: 'bold' }}>
              |
            </Text>
            <Text style={{ fontSize: 16, color: colors.black, fontWeight: 'bold' }}>
              0 Liking
            </Text>
          </View>


          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 15 }}>
            <Text style={{ fontSize: 19, color: colors.black, fontWeight: 'bold', paddingEnd: 10 }}>
              {company?.name}
            </Text>
            <Text>
              <Icon as={FontAwesome5} size={4} name="star" mr="2" solid={true} color={colors.orange} w="4" />
            </Text>
            <Text style={styles.companyRate}>
              {company?.rate}
            </Text>
          </View>

          <Text style={{ fontSize: 17, color: colors.black, }}>
            {company?.bio}
          </Text>


          <TouchableOpacity style={{ flex: 1, borderWidth: 1, borderColor: colors.primary, padding: 10, borderRadius: 10, marginVertical: 15, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: colors.black, fontSize: 17 }}>
              Edit Account
            </Text>
          </TouchableOpacity>


          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 7, }}>
            <Icon as={FontAwesome5} size={4} name="map-marker-alt" mr="2" solid={true} color={colors.black} w="4" />
            <Text style={{ fontSize: 15, color: colors.black, fontWeight: 'bold' }}>
              {company?.address}
            </Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 7, }}>
            <Icon as={FontAwesome5} size={4} name="mobile" mr="2" solid={true} color={colors.black} w="4" />
            <Text style={{ fontSize: 15, color: colors.black, fontWeight: 'bold' }}>
              {company?.phoneNumber}

            </Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 7, }}>
            <Icon as={FontAwesome5} size={4} name="at" mr="2" solid={true} color={colors.black} w="4" />
            <Text style={{ fontSize: 15, color: colors.black, fontWeight: 'bold' }}>
              {company?.email}

            </Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 7, }}>
            <Icon as={FontAwesome5} size={4} name="mouse-pointer" mr="2" solid={true} color={colors.black} w="4" />
            <Text style={{ fontSize: 15, color: colors.black, fontWeight: 'bold' }}>
              {company?.webSite}

            </Text>
          </View>







          <View style={{ borderBottomColor: colors.lightGrey, borderBottomWidth: 1, marginVertical: 15 }} />
          <Text style={{ fontSize: 18, color: colors.black, fontWeight: 'bold' }}>
            Services :
          </Text>

          <FlatList data={company?.services}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) =>
              <Text style={{ fontSize: 17, color: colors.black, paddingVertical: 3 }}>
                {item}
              </Text>
            }
            keyExtractor={item => item.id}
            contentContainerStyle={{ padding: 10 }} />


          <View style={{ borderBottomColor: colors.lightGrey, borderBottomWidth: 1, marginVertical: 15 }} />
          <Text style={{ fontSize: 18, color: colors.black, fontWeight: 'bold' }}>
            Worked with :
          </Text>


          <FlatList data={company?.prevWork}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) =>
              <Text style={{ fontSize: 17, color: colors.black, paddingVertical: 3 }}>
                {item}
              </Text>
            }
            keyExtractor={index => index}
            contentContainerStyle={{ padding: 10 }} />



          <View style={{ borderBottomColor: colors.lightGrey, borderBottomWidth: 1, marginVertical: 15 }} />
          <Text style={{ fontSize: 18, color: colors.black, fontWeight: 'bold', marginVertical: 5 }}>
            Team :
          </Text>
          <FlatList data={company?.team}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) =>
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
            contentContainerStyle={{ padding: 10 }} />



          <TouchableOpacity onPress={() => signOut()} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.lightRed, padding: 15, borderRadius: 30 }}>
            <Text>
              <Icon as={FontAwesome5} name={'sign-out-alt'} size={6} color={colors.red} />
            </Text>
            <Text style={{ fontSize: 16, color: colors.red, fontWeight: 'bold', paddingHorizontal: 5 }}>
              Sign Out
            </Text>

          </TouchableOpacity>

        </View>



      </ScrollView>
    );
else
  return (
    <View showsVerticalScrollIndicator={false} style={{ flex: 1, backgroundColor: colors.primary20 }}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />




      <TouchableOpacity onPress={() => navigation.navigate("SignInScreen")} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.primary, padding: 15, borderRadius: 30, margin: 20 }}>
        <Text>
          <Icon as={FontAwesome5} name={'sign-in-alt'} size={6} color={colors.white} />
        </Text>
        <Text style={{ fontSize: 16, color: colors.white, fontWeight: 'bold', paddingHorizontal: 5 }}>
          Sign In
        </Text>

      </TouchableOpacity>




    </View>
  );


};



export default ProfileScreen;
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
    justifyContent: 'center',
    alignItems: 'center'
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