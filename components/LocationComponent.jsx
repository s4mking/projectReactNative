
import React, { PureComponent, useEffect } from 'react'
import { AsyncStorage, View,Text,TextInput,Button,StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';



const LocationComponent = ({location,index}) => {
  useEffect(() => {
    console.log("loc compo")
    console.log(location)
  }, []);
  return (
    <View style={styles.location}>
       <Text style={styles.centeredText}>
         Destination n°{index} : {location.title} {"\n"}
         Description : {location.description}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  trip: {
    textAlign: "center",
    borderColor: "#20232a",
    borderWidth: 4,
    padding: 4,
    marginBottom:4
  },
  centeredText: {
    textAlign: "center",
  },
  location: {
    padding: 4,
    backgroundColor:"#fff7e6"
  }
})

export default LocationComponent;