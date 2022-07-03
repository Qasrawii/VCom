
import { Icon } from 'native-base';
import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import colors from '../../Assets/colors';
const CompanyCard = ({ companyName, companyRate, companyBio, onPress, style }) => {



  return (
    <TouchableOpacity onPress={onPress}
      style={[styles.container, style]}>
      <View style={styles.imageContainer} >
        <Text>
          <Icon as={FontAwesome5} name="user" size={8} color={colors.white} solid={true} />
        </Text>
      </View>
      <View style={styles.companyNameContainer}>
        <Text style={styles.companyName}>
          {companyName}
        </Text>
        <Text>
          <Icon as={FontAwesome5} size={3} name="star" mr="1" solid={true} color={colors.orange} />
        </Text>
        <Text style={styles.companyRate}>
          {companyRate}
        </Text>
      </View>
  
    </TouchableOpacity>);
};



export default CompanyCard;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    margin: 10,
    borderRadius: 20,
    backgroundColor: colors.white,
    width:160,
   
    alignItems: 'center'

  },
  imageContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.primary,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.white
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
    fontSize: 15,
    color: colors.black
  },
  companyBio: {
    fontSize: 15,
    color: colors.black
  }
});
