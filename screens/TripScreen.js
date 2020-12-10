
import React, { PureComponent, useEffect } from 'react'
import { AsyncStorage, View,Text,TextInput,Button,StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import TripsComponent from '../components/TripsComponent'


const TripScreen = () => {
  const trips = useSelector(state => state.trips.trips)
  const auth = useSelector(state => state.auth)
  useEffect(() => {
   console.log("trips screen")
   console.log(auth)
  }, []);
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Voici la liste de vos différents trips</Text>
      <View style={styles.trips}>
        {trips.map((trip)=>
        <TripsComponent trip={trip} key={trip.title} />
      )}
      </View>
      
    </ScrollView>
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