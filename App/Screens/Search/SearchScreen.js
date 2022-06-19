
import { Icon, FlatList } from 'native-base';
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

const SearchScreen = ({ navigation }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const { width, height } = useDimensions().window
  const arr = [
    1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2
  ]
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const subscriber = firestore()
      .collection('categories')
      .onSnapshot(querySnapshot => {
        const categories = [];

        querySnapshot.forEach(documentSnapshot => {
          categories.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setCategories(categories);
      });
    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);


  return (
    <View style={{ backgroundColor: colors.primary20, paddingBottom: 15, alignItems: 'center' }}>

      <FlatList
        data={categories}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) =>
          <TouchableOpacity onPress={() => navigation.navigate("CategoryScreen")} style={{ padding: 15, margin: 10, borderRadius: 20, backgroundColor: colors.primary50, alignItems: 'center', width: width * .45, height: width * .45 }}>
            <View style={{ width: 80, height: 80, borderRadius: 2222, backgroundColor: colors.primary, marginHorizontal: 5, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: colors.white }} >
              <Text>
                <Icon as={FontAwesome5} name={item.icon} color={colors.white} size="7" />
              </Text>
            </View>
            <Text style={{ fontSize: 15, color: colors.darkBlack, fontWeight: 'bold', margin: 10, textAlign: 'center' }}>
              {item.name}
            </Text>
          </TouchableOpacity>
        }
        numColumns={2}
        keyExtractor={item => item.key} />

    </View>
  );
};



export default SearchScreen;
