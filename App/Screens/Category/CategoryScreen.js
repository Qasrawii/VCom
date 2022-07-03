
import { Icon, FlatList } from 'native-base';
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

const CategoryScreen = ({ navigation,route }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const { width, height } = useDimensions().window
  const [companies, setCompanies] = useState([])
  const categoryName = route.params.categoryName


useEffect(() => {

}, [])

  useEffect(() => {
    const subscriber = firestore()
      .collection('companies')
      .where('category', '==', categoryName)
      .onSnapshot(querySnapshot => {
        const companies = [];

        querySnapshot?.forEach(documentSnapshot => {
          companies.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setCompanies(companies);
      });
    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: colors.primary20 }}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <FlatList data={companies}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) =>
            <CompanyCard
              companyName={item.name}
              companyRate={item.rate}
              onPress={() => navigation.navigate("CompanyScreen",{item})}
            />
          }
          keyExtractor={item => item.id} />


    </ScrollView>
  );
};



export default CategoryScreen;
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
