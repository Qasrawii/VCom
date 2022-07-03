
import { Icon, FlatList, Image, Input } from 'native-base';
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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDimensions } from '@react-native-community/hooks'
import colors from '../../Assets/colors';
import Carousel from 'react-native-snap-carousel';
import CompanyCard from '../../Components/Card/CompanyCard';
import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInScreenUser = ({ navigation }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [company, setCompany] = useState(undefined)
  const { width, height } = useDimensions().window


  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const login = () => {
    if (email != '' && password.length >= 8) {
      console.log('auth', auth().currentUser)
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(async () => {
          console.log('User account created & signed in!');
          const Company = await firestore().collection('Users').doc(await auth().currentUser._user.uid)
            .onSnapshot(documentSnapshot => setCompany(documentSnapshot.data()))




        })

        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            alert('That email address is already in use!');
          }
          if (error.code === 'auth/invalid-email') {
            alert('That email address is invalid!');
          }
          console.error(error);
        })
    }
  }


  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);


  useEffect(() => {
    setUserAccount()
  }, [company]);

  const setUserAccount = async () => {
    if (company != undefined) {
      await AsyncStorage.setItem("user", JSON.stringify(company))
      navigation.replace("ProfileScreen")
    }

  }




  return (
    <View showsVerticalScrollIndicator={false} style={{ backgroundColor: colors.primary20, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />



      <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: colors.white, padding: 30, borderRadius: 25 }}>
        <Image
          source={require('../../Assets/logo.jpg')}
          style={{ width: width * 0.60, height: 50, marginVertical: 30 }}
          resizeMode={'contain'}
          alt="s"
        />

        <View style={{ paddingVertical: 10 }}>
          <Input
            w={{
              base: "75%",
              md: "25%"
            }}
            onChangeText={(val) => setEmail(val)}
            InputLeftElement={<Icon as={<MaterialIcons name="person" />}
              size={5} ml="2" color="muted.400" />}
            placeholder="Name" />
        </View>
        <View style={{ paddingVertical: 10 }}>

          <Input
            w={{
              base: "75%",
              md: "25%"
            }}
            onChangeText={(val) => setPassword(val)}

            type={show ? "text" : "password"}
            InputRightElement={
              <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />}
                size={5} mr="2" color="muted.400" onPress={() => setShow(!show)} />}
            placeholder="Password" />
        </View>

        <TouchableOpacity onPress={() => login()} style={{ backgroundColor: colors.primary, paddingVertical: 15, borderRadius: 10, marginTop: 10, justifyContent: 'center', alignItems: 'center', width: width * .5 }}>
          <Text style={{ fontSize: 17, fontWeight: 'bold', color: colors.white }}>
            Sign In
          </Text>
        </TouchableOpacity>

        <Text style={{ fontSize: 16, color: colors.black, marginTop: 15 }}>
          Don't have an account? <Text onPress={() => navigation.replace("SignUpScreenUser")} style={{ fontSize: 16, color: colors.primary, fontWeight: 'bold' }}>Sign Up</Text>
        </Text>



      </View>


    </View>
  );
};



export default SignInScreenUser;
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