
import React, { PureComponent, useEffect,useState } from 'react';
import { AsyncStorage, View,Text,TextInput,Button,StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import LoadScreen from './LoadScreen';
import { api, loadAuthorisationHeader } from "../helpers/axios";
import TripsComponent from '../components/TripsComponent';
import RNPickerSelect from 'react-native-picker-select';
import { useDispatch } from 'react-redux'



const TripScreen = () => {
  const [onlyMyTrips, setOnlyMyTrips] = useState(true);
  const [loading, setLoading] = useState(false);

  const trips = useSelector(state => state.trips.trips)  
  const [tripRendered, setTripRendered] = useState(trips);

  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const currentTrip = useSelector(state => state.currentTrip)
  console.log("all my trips")
  console.log(trips)



  const logout = () => {
    dispatch({type:"LOADING"})
    AsyncStorage.removeItem('email').then(email=>{
      AsyncStorage.removeItem('password').then(pass=>{
        AsyncStorage.removeItem('currentStep').then(email=>{
          AsyncStorage.removeItem('currentIndex').then(pass=>{
        dispatch({type:"RESET_LOC"})
        dispatch({type:"LOGOUT"})
        dispatch({type:"END_LOADING"})
          })
        })
    })
  })
}
useEffect(() => {
  console.log("tripscreen")
  console.log(tripRendered)
}, []);
  useEffect(() => {
    setLoading(true)
  if(onlyMyTrips){
    setTripRendered(trips)
    setLoading(false)
  }else{
    api
  .get(`/api/trips`)
  .then(res => {
    setTripRendered(res.data);
    setLoading(false)
  })
  .catch(err => {
    console.log(err)
    setLoading(false)
  })
  }
  }, [onlyMyTrips,trips]);
  return (
    <>
    {loading ?
    (<LoadScreen />)
    :
    <>
      <View style={styles.button}>
      {onlyMyTrips ? 
      (<Button title="Voir la liste de tout les trips de l'appli" onPress={() => setOnlyMyTrips(false) } />)
    :
    ( <Button title="Voir seuleument vos trips" onPress={() => setOnlyMyTrips(true) } />)}
    </View>

    <Ionicons name={'ios-log-out'} style={{zIndex: 100000,marginTop:30,marginLeft:20}} color={'gray'} size={50}
        onStartShouldSetResponder={() => logout()} />
    <ScrollView style={styles.container}>
  <Text style={styles.title}>{onlyMyTrips ?"Voici la liste de vos différents trips":"Voici la liste de tout les trips créés dans l'application" }</Text>
      
      
      <View style={styles.trips}>
        {tripRendered.map((trip)=>
        <TripsComponent trip={trip} key={trip.id} />
      )}
      </View>      
    </ScrollView>
    </>
  }
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#f2f2f2",
  },
  button:{
    marginTop: 46,
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