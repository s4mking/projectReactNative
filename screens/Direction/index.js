import React, { Component,useState,useEffect } from 'react';
import MapViewDirections from 'react-native-maps-directions';
import { StyleSheet, Text,View, TouchableOpacity,Alert } from "react-native";
import MapView, {
    Polyline,
    PROVIDER_GOOGLE
  } from 'react-native-maps';
  import haversine from "haversine";
  import { connect } from 'react-redux';

const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;

function Direction(props) {
  
    const [markers,setMarkers]= useState([
      {
        latitude: 49.169617,
        longitude: 2.416606,
        title: 'New place',
        subtitle: 'My new place'
      }
    ]);
    const [latitude,setLatitude]= useState(49.171320);
    const [longitude,setLongitude]= useState(2.419825);
    const [routeCoordinates,setRouteCoordinates]= useState([]);
    const [distanceTravelled,setDistanceTravelled]= useState(0);
    const [distanceBetween,setDistanceBetween]= useState(0);
    const [prevLatLng,setPrevLatLng]= useState({});
    const [cordLatitude,setCordLatitude]= useState(49.166537);
    const [cordLongitude,setCordLongitude]= useState(2.435575);
    const [x,setX]= useState(false);
    const [marker,setMarker]= useState();
    const [target,setTarget]= useState(0);
    const [error,setError]= useState(null);
    const [concat,setConcat]= useState(null);

    useEffect(()=>{
      console.log("right here")
      console.log(props.trips)
      //watcher to geoloc
      watchID = navigator.geolocation.watchPosition(
          position => {
            const { latitude, longitude } = position.coords;
         
            const newCoordinate = {
              latitude,
              longitude
            };
    
            if (Platform.OS === "android") {
              if (marker) {
                  marker.animateMarkerToCoordinate(
                    newCoordinate,
                       500
                  );
                // marker._component.animateMarkerToCoordinate(
                //   newCoordinate,
                //   500
                // );
              }
            } else {
              coordinate.timing(newCoordinate).start();
            }
    
              setLatitude(latitude)
              setLongitude(longitude)
              setRouteCoordinates(routeCoordinates.concat([newCoordinate]))
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
      navigator.geolocation.getCurrentPosition(
         (position) => {
            setLatitude(position.coords.latitude);
             setLongitude(position.coords.longitude);
             setError(null);
           mergeLot();
         },
         (error) => setError(error.message),
         { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
       );
    },[])

  //in future need to separate in function
  const detectDestination = (e)=>{
    console.log(distanceBetween)
    console.log("distance entre")
    if(distanceBetween == 332){
      Alert.alert(
        'Vous êtes arrivés'
    )
    }
  };

  //Caculate distance
  const calcCrow = (e)=>{
    if ((latitude == markers[0].latitude) && (longitude == markers[0].longitude)) {
      return 0;
    }
    else {
      var unit = 'K'
      var radlat1 = Math.PI * latitude/180;
      var radlat2 = Math.PI * markers[0].latitude/180;
      var theta = longitude-markers[0].longitude;
      var radtheta = Math.PI * theta/180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit=="K") { dist = dist * 1.609344 }
      console.log(dist.toFixed(2));
      if(dist.toFixed(2) < 0.10){
        Alert.alert(
          'Vous êtes arrivés'
      )
        }
      return dist.toFixed(2);
    }
  };

// //Harversine
const mergeLot = (e)=>{
    if (latitude != null && longitude!=null)  
     {
       let concatLot = latitude +","+longitude
      
         setConcat(concatLot)
         //normalement  'est async la
         getDirections(concatLot, markers[0].latitude+","+markers[0].longitude);
     
     }
   }

   const calcDistance = newLatLng => {
    return haversine(prevLatLng, newLatLng) || 0;
  };

  //Get direction between 2 pins
  
  const getDirections = async (startLoc, destinationLoc) => {
         try {
             let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }`)
             let respJson = await resp.json();
             let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
             let coords = points.map((point, index) => {
                 return  {
                     latitude : point[0],
                     longitude : point[1]
                 }
             })
             setCoords(coords)
             setX("true")
             console.log(coords)
             return coords
         } catch(error) {
           console.log('passe')
             setX("error")
             return error
         }
     }

     //Map region with autoupdate 
     const getMapRegion = (e) => ({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      });
  
      return (
        <View style={styles.container}>
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
    destination={{"latitude":markers[0].latitude,"longitude":markers[0].longitude}}
    apikey="AIzaSyBBb9bOEPqf7g1NSx-TwAoAy-WdoiY4MvY"
  />
      {!!latitude && !!longitude && <MapView.Marker
         coordinate={{"latitude":latitude,"longitude":longitude}}
         title={"Your Location"}
       />}

       {!!cordLatitude && !!cordLongitude && <MapView.Marker
          coordinate={{"latitude":markers[0].latitude,"longitude":markers[0].longitude}}
          title={"Your Destination"}
        />}
      </MapView>
      <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.bubble, styles.button]}>
            <Text style={styles.bottomBarContent}>
              Parcouru {parseFloat(distanceTravelled).toFixed(2)} km
            </Text>
            <Text style={styles.bottomBarContent}>
              Il reste {distanceBetween} km
            </Text>
          </TouchableOpacity>
        </View>
    </View>
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
  }
});

const mapStateToProps = state => {
  return { trips: state.trips };
};

export default connect(mapStateToProps)(Direction);