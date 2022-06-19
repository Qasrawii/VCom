
import { Icon, FlatList } from 'native-base';
import React, { useEffect, useState } from 'react';
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
import firestore from '@react-native-firebase/firestore';

const HomeScreen = ({ navigation }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const { width, height } = useDimensions().window
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const arr = [
    1, 2, 2, 2, 2
  ]
  useEffect(() => {
    getAds()
  

  }, [])
  

  useEffect(() => {
    const subscriber = firestore()
      .collection('categories')
      .onSnapshot(querySnapshot => {
        const categories = [];

        querySnapshot?.forEach(documentSnapshot => {
          categories.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setCategories(categories);
        setLoading(false);
      });
    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  const getAds= async()=>{
    console.log('first')

    const url = await storage().ref('Ads').getDownloadURL();
    console.log('url', url)
  }









  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: colors.f2 }}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={{ marginVertical: 15 }}>
        <Carousel
          data={arr}
          sliderWidth={width}
          itemWidth={width * .8}
          itemHeight={350}
          renderItem={() => {
            return (
              <View style={{ backgroundColor: colors.primary, width: width * .8, height: 180, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: colors.white, fontSize: 21 }}>
                  Ads here
                </Text>
              </View>
            )
          }}
        />
      </View>



      <View style={{ backgroundColor: colors.f2, paddingVertical: 5 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 10 }}>
          <Text style={{ fontSize: 21, color: colors.black, fontWeight: 'bold', marginHorizontal: 5 }}>
            Top Rated Companies
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("CategoryScreen")}>
            <Text style={{ fontSize: 16, color: colors.black, marginHorizontal: 5 }}>
              View All
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList data={arr}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) =>
            <CompanyCard
              companyName={"Company Name"}
              companyRate={"5"}
              onPress={() => navigation.navigate("CompanyScreen")}
            />
          }
          keyExtractor={item => item.id} />

      </View>
      <View style={{ backgroundColor: colors.primary20, paddingBottom: 15 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 10 }}>
          <Text style={{ fontSize: 21, color: colors.black, fontWeight: 'bold', marginHorizontal: 5 }}>
            Categories
          </Text>
        </View>
        <FlatList data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) =>

            <TouchableOpacity onPress={() => navigation.navigate("CategoryScreen")} style={{ padding: 15, margin: 10, borderRadius: 20, backgroundColor: colors.primary50, alignItems: 'center', width: width * .4 }}>
              <View style={{ width: 70, height: 70, borderRadius: 35, backgroundColor: colors.primary, marginHorizontal: 5, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: colors.white }} >
                <Text>
                  <Icon as={FontAwesome5} name={item.icon} color={colors.white} size="7" />
                </Text>
              </View>
              <Text style={{ fontSize: 14, color: colors.darkBlack, fontWeight: 'bold', margin: 5, textAlign: 'center' }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          }
          keyExtractor={item => item.id} />

      </View>


      <View style={{ backgroundColor: colors.f2, paddingVertical: 5 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 10 }}>
          <Text style={{ fontSize: 21, color: colors.black, fontWeight: 'bold', marginHorizontal: 5 }}>
            Top Rated IT Companies
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("CategoryScreen")}>
            <Text style={{ fontSize: 16, color: colors.black, marginHorizontal: 5 }}>
              View All
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList data={arr}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) =>
            <CompanyCard
              companyName={"Company Name"}
              companyBio={"companyBio"}
              companyRate={"5"}
              onPress={() => navigation.navigate("CompanyScreen")}

            />

          }
          keyExtractor={item => item.id} />

      </View>
      <View style={{ backgroundColor: colors.f2, paddingVertical: 5 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 10 }}>
          <Text style={{ fontSize: 21, color: colors.black, fontWeight: 'bold', marginHorizontal: 5 }}>
            Top Rated Art Companies
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("CategoryScreen")}>
            <Text style={{ fontSize: 16, color: colors.black, marginHorizontal: 5 }}>
              View All
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList data={arr}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) =>
            <CompanyCard
              companyName={"Company Name"}
              companyBio={"companyBio"}
              companyRate={"5"}
              onPress={() => navigation.navigate("CompanyScreen")}
            />
          }
          keyExtractor={item => item.id} />

      </View>
    </ScrollView>
  );
};



export default HomeScreen;
