
import { Icon, FlatList, Image, FormControl, Input, Actionsheet } from 'native-base';
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
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
  const [company, setCompany] = useState(undefined);
  const [editMode, setEditMode] = useState(false);
  const [servicesAction, setServicesAction] = useState(false);
  const [prevWorkAction, setPrevWorkAction] = useState(false);
  const [teamAction, setTeamAction] = useState(false);
  const [tmpService, setTmpService] = useState("")
  const [tmpPrevWork, setTmpPrevWork] = useState("")
  const [tmpTeam, setTmpTeam] = useState({
    name: "",
    rule: "",
    avatar: "user"
  })


  // const chooseFile = async () => {

  //   let options = {
  //     mediaType: 'mixed',
  //     quality: 1,
  //     selectionLimit: 0,


  //   };
  //   launchImageLibrary(options, (response) => {
  //     if (response.didCancel) {
  //     } else if (response.errorCode == 'camera_unavailable') {
  //       alert('Camera not available on device');
  //       return;
  //     } else if (response.errorCode == 'permission') {
  //       alert('Permission not satisfied');
  //       return;
  //     } else if (response.errorCode == 'others') {
  //       alert(response.errorMessage);
  //       return;
  //     }
  //     let result = response.assets[0]
  //     console.log('result', result)
  //     setFilePath(result.uri);
  //   });
  // };

  useEffect(() => {
    getCompany()

  }, [])

  const getCompany = async () => {
    let userData = JSON.parse(await AsyncStorage.getItem("user"))
    if (userData != {})
      setCompany(userData)
    else
      setCompany(undefined)

  }

  const addService = () => {
    let tmp = []
    tmp = company.services
    tmp.push(tmpService)
    setCompany({ ...company, services: tmp })

    setServicesAction(false)
  }
  const addPrevWork = () => {
    let tmp = []
    tmp = company.prevWork
    tmp.push(tmpPrevWork)
    setCompany({ ...company, prevWork: tmp })
    setPrevWorkAction(false)
  }
  const addTeam = () => {
    let tmp = []
    tmp = company.team
    tmp.push(tmpTeam)
    setCompany({ ...company, team: tmp })
    setTeamAction(false)
    console.log('company.team', company.team)
  }
  const deleteTeam = (index) => {
    let tmp = []
    tmp = company.team
    tmp.splice(index, 1);
    setCompany({ ...company, team: tmp })
  }
  const deleteWorked = (index) => {
    let tmp = []
    tmp = company.prevWork
    tmp.splice(index, 1);
    setCompany({ ...company, prevWork: tmp })
  }
  const deleteServices = (index) => {
    let tmp = []
    tmp = company.services
    tmp.splice(index, 1);
    setCompany({ ...company, services: tmp })
  }


  const Cancel = () => {
    getCompany()
    setEditMode(false)
  }


  const Save = () => {
    firestore()
      .collection('companies')
      .doc(auth().currentUser._user.uid)
      .set(company).then(() => {
        setEditMode(false)
      });

  }





  const signOut = async () => {
    auth()
      .signOut()
      .then(() => console.log("shaker", auth().currentUser?._user)).then(
        await AsyncStorage.setItem("user", JSON.stringify({}))
      ).then(setCompany(undefined)
      );


  }
  if (company != undefined)
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: colors.primary20 }}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <View style={{ backgroundColor: colors.primary20, paddingVertical: 25, alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity style={{ height: width * 0.30, width: width * 0.30, backgroundColor: colors.primary, borderRadius: width * 0.8, justifyContent: 'center', alignItems: 'center' }}>
            <Icon as={FontAwesome5} name={"user"} size={'6xl'} color={colors.white} solid={true} />
          </TouchableOpacity>
        </View>
        <View style={{minHeight:height*.67, backgroundColor: colors.white, paddingVertical: 30, paddingHorizontal: 20, borderTopRightRadius: 30, borderTopLeftRadius: 30 }}>





          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 15 }}>

            {
              editMode ?

                <FormControl w="3/4" name="300" isRequired  >
                  <FormControl.Label>name</FormControl.Label>
                  <Input
                    value={company.name}
                    onChangeText={(val) => {

                      setCompany({ ...company, name: val })

                    }}
                    placeholder="name" />

                </FormControl>
                :
                <>
                  <Text style={{ fontSize: 19, color: colors.black, fontWeight: 'bold', paddingEnd: 10 }}>
                    {company?.name}
                  </Text>


                  {
                    company.rate && <>
                      <Text>
                        <Icon as={FontAwesome5} size={4} name="star" mr="2" solid={true} color={colors.orange} w="4" />
                      </Text>
                      <Text style={styles.companyRate}>
                        {company?.rate}
                      </Text>
                    </>
                  }

                </>
            }






          </View>

          {
            editMode ?

              <FormControl w="3/4" maxW="300" isRequired  >
                <FormControl.Label>Bio</FormControl.Label>
                <Input
                  value={company.bio}
                  onChangeText={(val) => {

                    setCompany({ ...company, bio: val })

                  }}
                  placeholder="Bio" />

              </FormControl>
              :
              <Text style={{ fontSize: 17, color: colors.black, }}>
                {company?.bio}
              </Text>
          }



          {
            editMode ?
              <>
                <TouchableOpacity onPress={() => Save()}
                  style={{  borderWidth: 1, borderColor: colors.green, padding: 10, borderRadius: 10, marginTop: 15, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: colors.green, fontSize: 17 }}>
                    Save
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Cancel()}
                  style={{  borderWidth: 1, borderColor: colors.red, padding: 10, borderRadius: 10, marginVertical: 5, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: colors.red, fontSize: 17 }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </>

              :
              <TouchableOpacity onPress={() => setEditMode(true)}
                style={{  borderWidth: 1, borderColor: colors.primary, padding: 10, borderRadius: 10, marginVertical: 15, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: colors.black, fontSize: 17 }}>
                  Edit Account
                </Text>
              </TouchableOpacity>
          }

          {
            editMode ?
              company.address && <FormControl w="3/4" maxW="300" isRequired mt={5} >
                <FormControl.Label>Address </FormControl.Label>
                <Input
                  value={company.address}

                  onChangeText={(val) => {
                    setCompany({ ...company, address: val })

                  }}
                  keyboardType={'default'}
                  placeholder="Address" />

              </FormControl> :
              company.address && <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 7, }}>
                <Icon as={FontAwesome5} size={4} name="map-marker-alt" mr="2" solid={true} color={colors.black} w="4" />
                <Text style={{ fontSize: 15, color: colors.black, fontWeight: 'bold' }}>
                  {company?.address}
                </Text>
              </View>
          }






          {
            editMode ?
              <FormControl w="3/4" maxW="300" isRequired mt={5} >
                <FormControl.Label>phoneNumber </FormControl.Label>
                <Input
                  value={company.phoneNumber}

                  onChangeText={(val) => {
                    setCompany({ ...company, phoneNumber: val })

                  }}
                  keyboardType={'default'}
                  placeholder="phoneNumber" />

              </FormControl> :
              <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 7, }}>
                <Icon as={FontAwesome5} size={4} name="mobile" mr="2" solid={true} color={colors.black} w="4" />
                <Text style={{ fontSize: 15, color: colors.black, fontWeight: 'bold' }}>
                  {company?.phoneNumber}

                </Text>
              </View>
          }




          {
            editMode ?
              <FormControl w="3/4" maxW="300" isRequired mt={5} >
                <FormControl.Label>email </FormControl.Label>
                <Input
                  value={company.email}

                  onChangeText={(val) => {
                    setCompany({ ...company, email: val })

                  }}
                  keyboardType={'default'}
                  placeholder="email" />

              </FormControl> :
              <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 7, }}>
                <Icon as={FontAwesome5} size={4} name="at" mr="2" solid={true} color={colors.black} w="4" />
                <Text style={{ fontSize: 15, color: colors.black, fontWeight: 'bold' }}>
                  {company?.email}

                </Text>
              </View>
          }





          {
            editMode ?
              company.webSite && <FormControl w="3/4" maxW="300" isRequired mt={5} >
                <FormControl.Label>webSite </FormControl.Label>
                <Input
                  value={company.webSite}

                  onChangeText={(val) => {
                    setCompany({ ...company, webSite: val })

                  }}
                  keyboardType={'default'}
                  placeholder="webSite" />

              </FormControl> :
              company.webSite && <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 7, }}>
                <Icon as={FontAwesome5} size={4} name="mouse-pointer" mr="2" solid={true} color={colors.black} w="4" />
                <Text style={{ fontSize: 15, color: colors.black, fontWeight: 'bold' }}>
                  {company?.webSite}

                </Text>
              </View>
          }






          {company.services&&

<>          <View style={{ borderBottomColor: colors.lightGrey, borderBottomWidth: 1, marginVertical: 15 }} />
          <Text style={{ fontSize: 18, color: colors.black, fontWeight: 'bold' }}>
            Services :
          </Text>
          <FlatList data={company?.services}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) =>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 17, color: colors.black, paddingVertical: 3 }}>
                  {item}
                </Text>
                {
                  editMode && <Icon as={FontAwesome5} onPress={() => deleteServices(index)} name={"times"} size={4} color={colors.red} solid={true} />

                }

              </View>
            }
            keyExtractor={item => item.id}
            contentContainerStyle={{ padding: 10 }} />

          {
            editMode && <TouchableOpacity onPress={() => {
              setServicesAction(true)

            }}
              style={{ backgroundColor: colors.primary, paddingVertical: 15, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginVertical: 15 }}>
              <Text style={{ fontSize: 17, fontWeight: 'bold', color: colors.white }}>
                Add
              </Text>
            </TouchableOpacity>
          }


</>}


{
  company.prevWork&&<>
     <View style={{ borderBottomColor: colors.lightGrey, borderBottomWidth: 1, marginVertical: 15 }} />
          <Text style={{ fontSize: 18, color: colors.black, fontWeight: 'bold' }}>
            Worked with :
          </Text>


          <FlatList data={company?.prevWork}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) =>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 17, color: colors.black, paddingVertical: 3 }}>
                  {item}
                </Text>
                {
                  editMode && <Icon as={FontAwesome5} onPress={() => deleteWorked(index)} name={"times"} size={4} color={colors.red} solid={true} />

                }

              </View>
            }
            keyExtractor={index => index}
            contentContainerStyle={{ padding: 10 }} />

          {
            editMode && <TouchableOpacity onPress={() => {
              setPrevWorkAction(true)

            }}
              style={{ backgroundColor: colors.primary, paddingVertical: 15, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginVertical: 15 }}>
              <Text style={{ fontSize: 17, fontWeight: 'bold', color: colors.white }}>
                Add
              </Text>
            </TouchableOpacity>
          }
          <Actionsheet isOpen={prevWorkAction} onClose={() => setPrevWorkAction(false)} >
            <Actionsheet.Content >

              <FormControl maxW="300" isRequired >
                <FormControl.Label>Previous Work</FormControl.Label>
                <Input

                  onChangeText={(val) => {
                    setTmpPrevWork(val)
                    console.log('val', val)
                  }}
                  placeholder="Previous Work" />

              </FormControl>
              <TouchableOpacity onPress={() => {
                addPrevWork()

              }}
                style={{ backgroundColor: colors.primary, paddingVertical: 15, paddingHorizontal: 25, borderRadius: 10, minWidth: width * .5, justifyContent: 'center', alignItems: 'center', marginVertical: 15 }}>
                <Text style={{ fontSize: 15, fontWeight: 'bold', color: colors.white }}>
                  Add
                </Text>
              </TouchableOpacity>
            </Actionsheet.Content>
          </Actionsheet>
  </>
}
       

      {
        company.team&&<>
        <View style={{ borderBottomColor: colors.lightGrey, borderBottomWidth: 1, marginVertical: 15 }} />
                  <Text style={{ fontSize: 18, color: colors.black, fontWeight: 'bold', marginVertical: 5 }}>
                    Team :
                  </Text>
                  <FlatList data={company?.team}
                    horizontal={false}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) =>
                      <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.primary20, paddingHorizontal: 5, paddingVertical: 10, marginVertical: 7, borderRadius: 25 }}>
                        <View style={editMode ? [styles.imageContainer, { backgroundColor: colors.red }] : styles.imageContainer} >
                          <Text>
                            {
                              editMode ?
                                <Icon as={FontAwesome5} onPress={() => deleteTeam(index)} name={"times"} size={8} color={colors.white} solid={true} />
        
                                :
                                <Icon as={FontAwesome5} name={item.avatar} size={8} color={colors.white} solid={true} />
        
                            }
        
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
        
                  {
                    editMode && <TouchableOpacity onPress={() => {
                      setTeamAction(true)
        
                    }}
                      style={{ backgroundColor: colors.primary, paddingVertical: 15, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginVertical: 15 }}>
                      <Text style={{ fontSize: 17, fontWeight: 'bold', color: colors.white }}>
                        Add
                      </Text>
                    </TouchableOpacity>
        
                  }
        
                  <Actionsheet isOpen={teamAction} onClose={() => setTeamAction(false)} >
                    <Actionsheet.Content >
        
                      <FormControl maxW="300" isRequired mt={3} >
                        <FormControl.Label>Full Name</FormControl.Label>
                        <Input
        
                          onChangeText={(val) => {
                            setTmpTeam({ ...tmpTeam, name: val })
                          }}
                          placeholder="Full Name" />
        
                      </FormControl>
                      <FormControl maxW="300" isRequired mt={3} >
                        <FormControl.Label>Member Rule</FormControl.Label>
                        <Input
        
                          onChangeText={(val) => {
                            setTmpTeam({ ...tmpTeam, rule: val })
                          }}
                          placeholder="Rule" />
        
                      </FormControl>
                      <TouchableOpacity onPress={() => {
                        addTeam()
        
                      }}
                        style={{ backgroundColor: colors.primary, paddingVertical: 15, paddingHorizontal: 25, borderRadius: 10, minWidth: width * .5, justifyContent: 'center', alignItems: 'center', marginVertical: 15 }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold', color: colors.white }}>
                          Add
                        </Text>
                      </TouchableOpacity>
                    </Actionsheet.Content>
                  </Actionsheet>
        
        </>
      }
        


          <TouchableOpacity onPress={() => signOut()} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.lightRed, padding: 15, borderRadius: 30,marginVertical:20 }}>
            <Text>
              <Icon as={FontAwesome5} name={'sign-out-alt'} size={6} color={colors.red} />
            </Text>
            <Text style={{ fontSize: 16, color: colors.red, fontWeight: 'bold', paddingHorizontal: 5 }}>
              Sign Out
            </Text>

          </TouchableOpacity>

        </View>

        <Actionsheet isOpen={servicesAction} onClose={() => setServicesAction(false)} >
          <Actionsheet.Content >

            <FormControl maxW="300" isRequired >
              <FormControl.Label>Company Services</FormControl.Label>
              <Input

                onChangeText={(val) => {
                  setTmpService(val)
                  console.log('val', val)
                }}
                placeholder="Company Services" />

            </FormControl>
            <TouchableOpacity onPress={() => {
              addService()

            }}
              style={{ backgroundColor: colors.primary, paddingVertical: 15, paddingHorizontal: 25, borderRadius: 10, minWidth: width * .5, justifyContent: 'center', alignItems: 'center', marginVertical: 15 }}>
              <Text style={{ fontSize: 15, fontWeight: 'bold', color: colors.white }}>
                Add
              </Text>
            </TouchableOpacity>
          </Actionsheet.Content>
        </Actionsheet>




      </ScrollView>
    );
  else
    return (
      <View showsVerticalScrollIndicator={false} style={{ flex: 1, backgroundColor: colors.primary20 }}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />




        <TouchableOpacity onPress={() => navigation.navigate("SignInScreenUser")} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.primary, padding: 15, borderRadius: 30, margin: 20 }}>
          <Text>
            <Icon as={FontAwesome5} name={'sign-in-alt'} size={6} color={colors.white} />
          </Text>
          <Text style={{ fontSize: 16, color: colors.white, fontWeight: 'bold', paddingHorizontal: 5 }}>
            Sign In!
          </Text>

        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("SignInScreen")} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.primary, padding: 15, borderRadius: 30, margin: 20 }}>
          <Text>
            <Icon as={FontAwesome5} name={'sign-in-alt'} size={6} color={colors.white} />
          </Text>
          <Text style={{ fontSize: 16, color: colors.white, fontWeight: 'bold', paddingHorizontal: 5 }}>
            Sign Your Company In!
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