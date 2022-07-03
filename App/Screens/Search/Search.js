
import { Icon, FlatList, Modal, Input } from 'native-base';
import React, { useEffect, useState } from 'react';
import {
  Text,
  useColorScheme,
  View,
  TouchableOpacity
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useDimensions } from '@react-native-community/hooks'
import colors from '../../Assets/colors';
import firestore from '@react-native-firebase/firestore';
import CompanyCard from '../../Components/Card/CompanyCard';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Search = ({ navigation }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const { width, height } = useDimensions().window
  const [companies, setCompanies] = useState([])

  const arr = [
    1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2
  ]
  const [categories, setCategories] = useState([])





  const search = (query) => {
    console.log('query', query)
    if (query == '') {
      setCompanies([]);
      return
    }
     firestore()
      .collection('companies')
      .where('name', '>=', query)
      .where('name', '<=', query + '\uf8ff')
      .onSnapshot(querySnapshot => {
        const companies = [];

        querySnapshot?.forEach(documentSnapshot => {
          companies.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        console.log('companiescompanies', companies)
        setCompanies(companies);
      });
  }


  return (
    <View style={{ paddingBottom: 15, alignItems: 'center' }}>



      <View style={{ alignItems: 'center',justifyContent:'space-evenly',flexDirection:'row' ,paddingVertical: 10, backgroundColor: colors.white, width: width }}>
      <Icon as={FontAwesome5} name={"arrow-left"}  size="6"onPress={()=>navigation.pop()} />

        <Input
          w={{
            base: "80%",

          }}
          backgroundColor={colors.f2}
          variant="rounded"
          onChangeText={(val) => search(val)}
          InputLeftElement={<Icon as={<FontAwesome5 name="search" />}
            size={4} ml="5" color="muted.400" />}
          placeholder="Sreach..."
        />

      </View>

      <FlatList data={companies}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) =>
          <CompanyCard
            companyName={item.name}
            companyRate={item.rate}
            onPress={() => navigation.navigate("CompanyScreen")}
            style={{  maxWidth: 200, width: width * .4 }}
          />
        }
        keyExtractor={item => item.id} />











    </View>
  );
};



export default Search;
