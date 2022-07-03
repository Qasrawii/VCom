
import { Icon, FlatList, Image, Input, FormControl, CheckIcon, Select, WarningOutlineIcon, Actionsheet } from 'native-base';
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

const SignUpScreenUser = ({ navigation }) => {
    const isDarkMode = useColorScheme() === 'dark';
    const [show, setShow] = useState(false)
    const [show2, setShow2] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [tmpService, setTmpService] = useState("")
    const [tmpPrevWork, setTmpPrevWork] = useState("")
    const [tmpTeam, setTmpTeam] = useState({
        name: "",
        rule: "",
        avatar: "user"
    })
    const { width, height } = useDimensions().window
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    const [page, setPage] = useState(1);
    const [company, setCompany] = useState({
        avatar: "",
        name: "",
        phoneNumber: "",
        email: "",
    })


    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);


    const checkPassword = () => {
        if (password == confirmPassword && password != '')
            login()
        else
            alert("password dosn't match")
    }

    const login = () => {
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                console.log('User account created & signed in!');
            }).then(setPage(2)
            )
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    alert('That email address is already in use!');
                    setPage(1)
                }
                if (error.code === 'auth/invalid-email') {
                    alert('That email address is invalid!');
                    setPage(1)
                }
                console.error(error);
            })
    }
    useEffect(() => {
        setUserAccount()
      }, [company]);
    
      const setUserAccount = async () => {
        if (company != undefined) {
          await AsyncStorage.setItem("user", JSON.stringify(company))
          navigation.replace("ProfileScreen")
        }
    
      }
    const createCompany = () => {

        if (company.name == "" || company.phoneNumber == "" || company.email == "") {
            alert("please fill out all required fields")
            return
        }
        firestore()
            .collection('Users')
            .doc(auth().currentUser._user.uid)
            .set(company)
            .then(async () => {
                console.log('User account created & signed in!');
                const Company = await firestore().collection('Users').doc(await auth().currentUser._user.uid)
                  .onSnapshot(documentSnapshot => setCompany(documentSnapshot.data()))
    })
    }

    if (page == 1)
        return (
            <View showsVerticalScrollIndicator={false} style={{ backgroundColor: colors.primary20, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
                <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: colors.white, padding: 30, borderRadius: 25 }}>
                    <Image
                        source={require('../../Assets/logo.jpg')}
                        style={{ width: width * 0.60, height: 50, marginVertical: 30 }}
                        resizeMode={'contain'}
                        alt={"Vcom"}
                    />
                    <View style={{ paddingTop: 7 }}>
                        <Input
                            w={{
                                base: "75%",
                                md: "25%"
                            }}
                            onChangeText={(val) => setEmail(val)}
                            InputLeftElement={<Icon as={<MaterialIcons name="email" />}
                                size={5} ml="2" color="muted.400" />}
                            placeholder="Email" />
                    </View>
                    <View style={{ paddingTop: 7 }}>
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
                    <View style={{ paddingTop: 7 }}>
                        <Input
                            w={{
                                base: "75%",
                                md: "25%"
                            }}
                            onChangeText={(val) => setConfirmPassword(val)}
                            type={show2 ? "text" : "password"}
                            InputRightElement={
                                <Icon as={<MaterialIcons name={show2 ? "visibility" : "visibility-off"} />}
                                    size={5} mr="2" color="muted.400" onPress={() => setShow2(!show2)} />}
                            placeholder="confirm password" />
                    </View>

                    <TouchableOpacity onPress={() => checkPassword()} style={{ backgroundColor: colors.primary, paddingVertical: 15, borderRadius: 10, marginTop: 20, justifyContent: 'center', alignItems: 'center', width: width * .5 }}>
                        <Text style={{ fontSize: 17, fontWeight: 'bold', color: colors.white }}>
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 16, color: colors.black, marginTop: 15 }}>
                        Do you have an account? <Text onPress={() => navigation.replace("SignInScreenUser")} style={{ fontSize: 16, color: colors.primary, fontWeight: 'bold' }}>Sign in</Text>
                    </Text>
                </View>


            </View>
        )

    if (page == 2)
        return (
            <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: colors.f9, paddingBottom: 15 }}>
                <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
                <View style={{ backgroundColor: colors.white, padding: 15 }}>
                    <Image
                        source={require('../../Assets/logo.jpg')}
                        style={{ width: width * 0.4, height: 60, backgroundColor: 'red' }}
                        resizeMode={'contain'}
                        alt={"Vcom"}

                    />


                </View>


                <View style={{ padding: 20, backgroundColor: colors.white, marginTop: 15 }}>
                    <FormControl w="3/4" maxW="300" isRequired >
                        <FormControl.Label>Name</FormControl.Label>
                        <Input
                            value={company.name}
                            onChangeText={(val) => {
                                setCompany({ ...company, name: val })
                            }}
                            placeholder="Name" />

                    </FormControl>
                    <FormControl w="3/4" maxW="300" isRequired mt={5} >
                        <FormControl.Label>Bio</FormControl.Label>
                        <Input
                            value={company.bio}
                            onChangeText={(val) => {

                                setCompany({ ...company, bio: val })

                            }}
                            placeholder="Bio" />

                    </FormControl>
                </View>




                <View style={{ padding: 20, backgroundColor: colors.white, marginTop: 15 }}>
                    <FormControl w="3/4" maxW="300" isRequired mt={5} >
                        <FormControl.Label>Phone number</FormControl.Label>
                        <Input
                            value={company.phoneNumber}

                            onChangeText={(val) => {
                                setCompany({ ...company, phoneNumber: val })

                            }}
                            keyboardType={'phone-pad'}
                            placeholder="Phone number" />

                    </FormControl>
                    <FormControl w="3/4" maxW="300" isRequired mt={5} >
                        <FormControl.Label>Email</FormControl.Label>
                        <Input
                            value={company.email}

                            onChangeText={(val) => {
                                setCompany({ ...company, email: val })

                            }}
                            keyboardType={'email-address'}
                            placeholder="Email" />

                    </FormControl>



                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 15, paddingHorizontal: 20 }}>
                    <Text onPress={() => { setPage(1) }}
                        style={{ color: colors.primary, fontSize: 20, fontWeight: 'bold' }}>
                        {"< Back"}
                    </Text>
                    <Text onPress={() => createCompany()}
                        style={{ color: colors.primary, fontSize: 20, fontWeight: 'bold' }}>
                        {"Finish"}
                    </Text>

                </View>

            </ScrollView>
        )



    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: colors.f9, paddingBottom: 15 }}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            <View style={{ backgroundColor: colors.white, padding: 15 }}>
                <Image
                    source={require('../../Assets/logo.jpg')}
                    style={{ width: width * 0.4, height: 60, backgroundColor: 'red' }}
                    resizeMode={'contain'}
                    alt={"Vcom"}

                />


            </View>






        </ScrollView>
    )

};



export default SignUpScreenUser;
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
        width: 60,
        height: 60,
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