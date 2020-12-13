
import React, { PureComponent, useEffect } from 'react';
import { AsyncStorage, View,Text,TextInput,Button,StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import TripsComponent from '../components/TripsComponent';
import RNPickerSelect from 'react-native-picker-select';
import { useDispatch } from 'react-redux'



const TripScreen = () => {
  const trips = useSelector(state => state.trips.trips)
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const currentTrip = useSelector(state => state.currentTrip)

  const logout = () => {
    AsyncStorage.removeItem('email').then(email=>{
      AsyncStorage.removeItem('password').then(pass=>{
        dispatch({type:"LOGOUT"})
    })
  })
}
  useEffect(() => {
  //  console.log("trips screen")
  console.log("begin new trip")
   console.log(currentTrip)
  }, [currentTrip]);
  return (
    <>
    <Ionicons name={'ios-log-out'} style={{zIndex: 100000,marginTop:30,marginLeft:20}} color={'gray'} size={50}
        onStartShouldSetResponder={() => logout()} />
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Voici la liste de vos différents trips</Text>
      <RNPickerSelect
            onValueChange={(value) => console.log(value)}
            items={[
                { label: 'Football', value: 'football' },
                { label: 'Baseball', value: 'baseball' },
                { label: 'Hockey', value: 'hockey' },
            ]}
        />
      <View style={styles.trips}>
        {trips.map((trip)=>
        <TripsComponent trip={trip} key={trip.title} />
      )}
      </View>
      
    </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#f2f2f2",
  },
  title: {
    marginTop: 16,
    marginBottom: 15,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: "#20232a",
    borderRadius: 6,
    backgroundColor: "#61dafb",
    color: "#20232a",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold"
  },
  trips:{
    marginBottom:45
  }
})
export default TripScreen;