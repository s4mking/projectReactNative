
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
  const [notationTrip, setNotationTrip] = useState(false);
  const [dataType, setDataType] = useState(false);
  const [idType, setIdType] = useState(null);
  const [idNotation, setIdNotation] = useState(null);

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

  const addTrip = (idType,idNotation,titleTrip,descriptionTrip) => {
    setLoading(true)
    console.log(idType)
    console.log(idNotation)
    console.log(titleTrip)
    console.log(descriptionTrip)
    console.log(auth.id)
    api
    .post("/api/trips", {
      "notation":parseInt(idNotation),
      "description":descriptionTrip,
      "author":`/api/people/${auth.id}`,
      "title": titleTrip,
      "type":`/api/types/${idType}`,
    }).then(res => {
      console.log("try create trip")
      console.log(res.data)
      setLoading(false)
    }).catch(err => {
      console.log(err)
      setLoading(false)
    })
  }

  const addloc = (idTrip,latitude,longitude,title,description) => {
    setLoading(true)
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
        setLoading(false)
      }).catch(err => {
        console.log(err)
        setLoading(false)
      })
  };

  useEffect(() => {
    setLoading(true)
    console.log("auth",auth)
    // setLoading(false)
  //  console.log("trips screen")
    let data = [];
    let itemType = [];
    let notationType = [];
    for (let i = 1; i <= 10; i++) {
      notationType.push({label:i.toString(),value:i.toString()})
    }
    setNotationTrip(notationType)
  for (const property in myTrips) {
    let title = myTrips[property].title
    let id = myTrips[property].id
    data.push({label:title,value:id})
  }
  setDataTrip(data)
  api
  .get(`/api/types`)
  .then(res => {
    let types=(res.data)
    types.forEach(type => {
      itemType.push({label:type.name,value:type.id})
    });
    setDataType(itemType);
    setLoading(false)
  })
  .catch(err => {
    console.log(err)
    setLoading(false)
  })
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
            value={idTrip}
            placeholder={{}}
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
      <Button title="Add new location" onPress={() => addloc(idTrip,latitude,longitude,title,description) } />
      <Text style={styles.title}>
         Add new trip
        </Text>
        {dataType ?
            
            <RNPickerSelect
                  value={idType}
                  placeholder={{}}
                  onValueChange={(value) => setIdType(value)}
                  items={dataType}
              /> : null }
        {notationTrip ?
        <RNPickerSelect
                  value={idNotation}
                  placeholder={{}}
                  onValueChange={(value) => setIdNotation(value)}
                  items={notationTrip}
              /> :
              null}
        

    <TextInput
        placeholder="title"
        value={title}
        onChangeText={setTitleTrip}
      />
      <TextInput
        placeholder="description"
        value={description}
        onChangeText={setDescriptionTrip}
      />

      <Button title="Add new trip" onPress={() => addTrip(idType,idNotation,titleTrip,descriptionTrip) } />

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