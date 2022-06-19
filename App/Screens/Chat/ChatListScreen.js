
import { Icon} from 'native-base';
import React, { useEffect } from 'react';
import {
  Text,
  StyleSheet,
  useColorScheme,
  View,
  TouchableOpacity
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useDimensions } from '@react-native-community/hooks'
import colors from '../../Assets/colors';
import { SwipeListView } from 'react-native-swipe-list-view';
const ChatListScreen = ({ navigation }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const { width, height } = useDimensions().window
  const arr = [
    1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2
  ]
  const listViewData = Array(10)
    .fill("")
    .map((_, i) => ({ key: `${i}`, text: `item #${i}` }));

  useEffect(() => {


  }, [])


  return (
    <SwipeListView
      data={listViewData}
      renderItem={(data, rowMap) => (
        <View underlayColor={colors.white}  style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, paddingHorizontal: 10, paddingVertical: 15, borderBottomColor: colors.lightGrey, borderBottomWidth: 1 }}>
        
            <TouchableOpacity onPress={() => navigation.navigate("ChatScreen")} style={styles.imageContainer} >
              <Text>
                <Icon as={FontAwesome5} name="user" size={7} color={colors.white} solid={true} />

              </Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 17, color: colors.black, fontWeight: 'bold', paddingHorizontal: 10 }}>
              First Last
            </Text>

        </View>
      )}
      renderHiddenItem={(data, rowMap) => (
        <View style={{ flex: 1, backgroundColor: colors.red, justifyContent: 'space-around', alignItems: 'flex-end' }}>
          <TouchableOpacity style={{ padding: 19, marginBottom: 10 }}>
            <Text>
              <Icon as={FontAwesome5} name="trash" size={7} color={colors.white} />

            </Text>
          </TouchableOpacity>
        </View>
      )}
      rightOpenValue={-75}
    />
  );
};



export default ChatListScreen;
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