
import React, { PureComponent, useEffect,useState } from 'react'
import { AsyncStorage, View,Text,TextInput,Button, Alert,StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import LocationComponent from './LocationComponent';
import { useDispatch } from 'react-redux'



const TripsComponent = ({trip}) => {
  const dispatch = useDispatch()
  const [showDetails, setShowDetails] = useState(false)
  console.log("kkkkkk")
    console.log(trip)
  const setTripCurrent = (trip) => {
    objtosave= JSON.stringify(trip.step[0])
    AsyncStorage.setItem('currentStep',"0")
    AsyncStorage.setItem('currentIndex',trip.id.toString())
    console.log("kkkkkk")
    console.log(trip)
    dispatch({type:"NEW_CURRENT",payload:{trip:trip}})
  }

  return (
    <View style={styles.trip}>
      {trip.step.length>=2 ?
        <Button
        onPress={() => setTripCurrent(trip)}
        title="Set this trip as current trip"
        color="#F09A26"
        accessibilityLabel="Action to set trip as current trip"
        /> :
        <Text>Vous ne pouvez pas mettre ce parcours en parcours courant car il ne contient pas au moins 2 locations</Text>
      }
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
        <LocationComponent location={location} index={index} key={location.id} />
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
    marginBottom:10
  },
  centeredText: {
    textAlign: "center",
  }
})
export default TripsComponent;