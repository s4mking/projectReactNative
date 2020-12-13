
import React, { PureComponent, useEffect,useState } from 'react';
import { AsyncStorage, View,Text,TextInput,Button,StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import { useDispatch } from 'react-redux'
import LoadScreen from './LoadScreen';

const AddScreen = () => {
  const [loading, setLoading] = useState(false);
  const myTrips = useSelector(state => state.trips.trips)
  const auth = useSelector(state => state.auth)
  const currentTrip = useSelector(state => state.currentTrip)
  const [dataTrip, setDataTrip] = useState(false);

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);

  const [titleTrip, setTitleTrip] = useState(null);
  const [descriptionTrip, setDescriptionTrip] = useState(null);




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
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Voici la liste de vos différents trips</Text>
      {dataTrip ? 
      <RNPickerSelect
            onValueChange={(value) => console.log(value)}
            items={dataTrip}
        /> : null }
        <TextInput 
   style={styles.textInput}
   keyboardType='numeric'
   onChangeText={(text)=> this.onChanged(text)}
   value={this.state.myNumber}
   maxLength={10}  //setting limit of input
/>
      <View>
        <Text>
          Add location to one of your trip
        </Text>
      </View>

     
      
    </ScrollView>}
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