
import React, { PureComponent, useEffect,useState } from 'react';
import { AsyncStorage, View,Text,TextInput,Button,StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import { useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import LoadScreen from './LoadScreen';
import { api, loadAuthorisationHeader } from "../helpers/axios";


const AddScreen = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const myTrips = useSelector(state => state.trips.trips)
  const auth = useSelector(state => state.auth)
  const currentTrip = useSelector(state => state.currentTrip)
  const [dataTrip, setDataTrip] = useState(false);

  const [latitude, setLatitude] = useState(null);
  const [idTrip, setIdTrip] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);

  const [titleTrip, setTitleTrip] = useState(null);
  const [descriptionTrip, setDescriptionTrip] = useState(null);

  const logout = () => {
    AsyncStorage.removeItem('email').then(email=>{
      AsyncStorage.removeItem('password').then(pass=>{
        dispatch({type:"LOGOUT"})
    })
  })
}

  const addloc = (idTrip,latitude,longitude,title,description) => {
    console.log(latitude)
    console.log(longitude)

    console.log(idTrip)

    console.log(title)
    console.log(description)

    api
      .post("/api/locations", {
        "latitude":parseInt(latitude),
        "longitude": parseInt(longitude),
        "description":description,
        "title": title,
        "trip":`/api/trips/${idTrip}`,
      }).then(res => {
        console.log("try create loc")
        console.log(res.data)
      }).catch(err => {
        console.log(err)
      })
  };

  useEffect(() => {
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      }, 5000);
  //  console.log("trips screen")
    let data = []
  console.log("begin new trip")
  for (const property in myTrips) {
    let title = myTrips[property].title
    let id = myTrips[property].id
    data.push({label:title,value:id})
  }
  setDataTrip(data)
  }, []);
  return (
    <>
    {loading ?
    <LoadScreen />
    :
    <>
    <Ionicons name={'ios-log-out'} style={{zIndex: 100000,marginTop:30,marginLeft:20}} color={'gray'} size={50}
        onStartShouldSetResponder={() => logout()} />
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.title}>
          Add location to one of your trip
        </Text>
        {dataTrip ? 
      <RNPickerSelect
            onValueChange={(value) => setIdTrip(value)}
            items={dataTrip}
        /> : null }
        <TextInput
        keyboardType='numeric'
        placeholder="latitude"
        value={latitude}
        onChangeText={setLatitude}
      />
      <TextInput
        keyboardType='numeric'
        placeholder="longitude"
        value={longitude}
        onChangeText={setLongitude}
      />
      <TextInput
        placeholder="title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        placeholder="description"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Sign in" onPress={() => addloc(idTrip,latitude,longitude,title,description) } />


      </View>

    </ScrollView>
    </>}
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
export default AddScreen;