import React, { Component,useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import MapViewDirections from 'react-native-maps-directions';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text,View, TouchableOpacity,Alert,AsyncStorage,Modal,TouchableHighlight } from "react-native";
import MapView, {
    PROVIDER_GOOGLE
  } from 'react-native-maps';
  import haversine from "haversine";
  import { useDispatch } from 'react-redux'

const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;

const Direction = ({navigation}) => {
  const dispatch = useDispatch()
  const currentTrip = useSelector(state => state.currentTrip)
  const currentLoad = useSelector(state => state.loading)
  console.log(currentTrip)
  if(currentTrip.trip==null){
    navigation.navigate('Trip')
  }
  // useEffect(()=>{
  //   console.log("test daniel")
  //   console.log(currentTrip)
  //   if(currentTrip==undefined){
  //     navigation.navigate('Trip')
  //   }
  // },[currentTrip])


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

    const [latitude,setLatitude]= useState(49.171320);
    const [longitude,setLongitude]= useState(2.419825);
    const [distanceTravelled,setDistanceTravelled]= useState(0);
    const [distanceBetween,setDistanceBetween]= useState(0);
    const [prevLatLng,setPrevLatLng]= useState({});
    const [x,setX]= useState(false);
    const [marker,setMarker]= useState();
    const [currentStepIterator,setStepIterator]= useState(0);
    const [currentStep,setStep]= useState({});
    const [target,setTarget]= useState(0);
    const [error,setError]= useState(null);
    const [nameThis,setNameThis]= useState(true);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(()=>{
    },[currentTrip.trip.step[currentStepIterator]])
    useEffect(()=>{
      // ne marche pas plus propre que de passer à chaque fois le tableau en entier
      setStep(currentTrip.trip.step[currentStepIterator])
      
      //watcher to geoloc la position de l'utilisateur
      navigator.geolocation.watchPosition(
          position => {
            const { latitude, longitude } = position.coords;
            const newCoordinate = {
              latitude,
              longitude
            };
    
            if (Platform.OS === "android") {
              if (marker) {
                  marker._component.animateMarkerToCoordinate(
                    newCoordinate,
                       500
                  );
              }
            } else {
              coordinate.timing(newCoordinate).start();
            }
            //quand l'utilisateur a bougé on recalcule totues les distances
              setLatitude(latitude)
              setLongitude(longitude)
              setDistanceBetween(calcCrow())
              setTarget(detectDestination())
              setDistanceTravelled(distanceTravelled + calcDistance(newCoordinate))
              setPrevLatLng(newCoordinate)
          },
          error => console.log(error),
          {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 1000,
            distanceFilter: 10
          }
        );
    },[])

  //detecte si on arrive proche de la cible si oui on affiche la modal avec les infos et on itere notre index de 1
  const detectDestination = (e)=>{
    if(distanceBetween == 332){
      setModalVisible(true);
    setStepIterator(currentStepIterator+1)
    if(currentStepIterator == (currentTrip.trip.step.length-1)){
        Alert.alert(
          'Le parcours est maintenant fini ^^'
      )
    }
}
  };

  //Caculate distance between 2 points have to implement myself
  const calcCrow = (e)=>{
    if ((latitude == currentTrip.trip.step[currentStepIterator].latitude) && (longitude == currentTrip.trip.step[currentStepIterator].longitude)) {
      return 0;
    }
    else {
      var unit = 'K'
      var radlat1 = Math.PI * latitude/180;
      var radlat2 = Math.PI * currentTrip.trip.step[currentStepIterator].latitude/180;
      var theta = longitude-currentTrip.trip.step[currentStepIterator].longitude;
      var radtheta = Math.PI * theta/180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit=="K") { dist = dist * 1.609344 }
      return dist.toFixed(2);
    }
  };

   const calcDistance = newLatLng => {
    return haversine(prevLatLng, newLatLng) || 0;
  };
     //Map region with autoupdate 
     const getMapRegion = (e) => ({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      });
  
      return (
        <>
        {nameThis ? (<><Ionicons name={'ios-log-out'} style={{zIndex: 100000,marginTop:30,marginLeft:20}} color={'gray'} size={50}
        onStartShouldSetResponder={() => logout()} />
        <View style={styles.container}>
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{currentTrip.trip.step[currentStepIterator].description}</Text>

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
        <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showUserLocation
        followUserLocation
        loadingEnabled
        region={getMapRegion()}
      >
<MapViewDirections
    origin={{"latitude":latitude,"longitude":longitude}}
    mode="WALKING"
    language='fr'
    destination={{"latitude":currentTrip.trip.step[currentStepIterator].latitude,"longitude":currentTrip.trip.step[currentStepIterator].longitude}}
    apikey="AIzaSyBBb9bOEPqf7g1NSx-TwAoAy-WdoiY4MvY" strokeColor="lightblue" strokeWidth={4}
  />
      {!!latitude && !!longitude && <MapView.Marker
         coordinate={{"latitude":latitude,"longitude":longitude}}
         title={"Your Location"}
       />}

       {!!currentTrip.trip.step[currentStepIterator].latitude && !!currentTrip.trip.step[currentStepIterator].longitude && <MapView.Marker
          coordinate={{"latitude":currentTrip.trip.step[currentStepIterator].latitude,"longitude":currentTrip.trip.step[currentStepIterator].longitude}}
          title={"Your Destination"}
        />}
      </MapView>
      <View style={styles.buttonContainer}>
          <TouchableOpacity  style={[styles.bubble, styles.button,styles.opacityContainer]}>
            <Text style={styles.bottomBarContent}>
              Etape {(currentStepIterator + 1)} / {(currentTrip.trip.step.length)}
            </Text>
            <Text style={styles.bottomBarContent}>
              Vous êtes à {distanceBetween} km de la cible
            </Text>
          </TouchableOpacity>
        </View>
    </View></>):<Text> "faudrait un loader"</Text> }
        
    </>
    );
  }

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  bubble: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20
  },
  latlng: {
    width: 200,
    alignItems: "stretch"
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: "center",
    marginHorizontal: 10
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 20,
    backgroundColor: "transparent"
  },
  bottomBarContent:{
    color:"red"
  },
  opacityContainer: {
    backgroundColor: "#61dafb"
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },

});

export default Direction;