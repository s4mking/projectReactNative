
import React, { PureComponent, useEffect,useState } from 'react'
import { AsyncStorage, View,Text,TextInput,Button, Alert,StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import LocationComponent from './LocationComponent';



const TripsComponent = ({trip}) => {
  const [showDetails, setShowDetails] = useState(false)
  
  useEffect(() => {
    console.log("kjljk")
    console.log(trip.title)
  }, []);
  return (
    <View style={styles.trip}>
      <View onStartShouldSetResponder={() => setShowDetails(!showDetails)}>
        <Text style={styles.centeredText}>{trip.title}</Text>
        <Text style={styles.centeredText}>
              Description : {trip.description}
        </Text>
        <Text style={styles.centeredText}>
          Notation : {trip.notation}
        </Text>
      </View>
      {
        showDetails ? (
        <View>
          <View>
            {/* <Text>
              {trip.description}
            </Text> */}
          </View>
          {trip.step.map((location,index)=>
        <LocationComponent location={location} index={index} key={location.latitude} />
      )}
        </View>
        ):null
      }
    </View>
  );
};


const styles = StyleSheet.create({
  trip: {
    backgroundColor:"#ffe6b3",
    textAlign: "center",
    borderColor: "#20232a",
    borderWidth: 4,
    padding: 4,
    marginBottom:4
  },
  centeredText: {
    textAlign: "center",
  }
})
export default TripsComponent;