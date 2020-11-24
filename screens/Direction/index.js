import React, { PureComponent, useEffect,useState,Component } from 'react'
import { AppRegistry, StyleSheet, Dimensions, Image, Text,View, StatusBar, TouchableOpacity,Alert } from "react-native";
import MapView, {
    Marker,
    AnimatedRegion,
    Polyline,
    PROVIDER_GOOGLE
  } from 'react-native-maps';
  import {Constants,Location} from 'expo';
  import haversine from "haversine";
  import { connect, useSelector } from 'react-redux'
import { api, loadAuthorisationHeader } from "../../helpers/axios";

const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
const LATITUDE = 49.166537;
const LONGITUDE = 2.435575;

class Direction extends Component {
  constructor(props) {
    super(props);
    this.findCurrentLocation();
    this.state = {
        markers : [
            {
              latitude: 49.169617,
              longitude: 2.416606,
              title: 'New place',
              subtitle: 'My new place'
            }
          ],
      latitude: 49.171320,
      longitude: 2.419825,
      routeCoordinates: [],
    distanceTravelled: 0,
    distanceBetween: 0,
      error: null,
      concat: null,
      coords:[],
      x: 'false',
      prevLatLng: {},
      cordLatitude:49.166537,
      cordLongitude:2.435575,
      target:0
    };

    this.mergeLot = this.mergeLot.bind(this);

  }

  componentDidMount() {
    console.log("right here")
    console.log(this.props.trips)
    //watcher to geoloc
    this.watchID = navigator.geolocation.watchPosition(
        position => {
          const { routeCoordinates, distanceTravelled, distanceBetween } = this.state;
          const { latitude, longitude } = position.coords;
       
          const newCoordinate = {
            latitude,
            longitude
          };
  
          if (Platform.OS === "android") {
            if (this.marker) {
                this.marker.animateMarkerToCoordinate(
                  newCoordinate,
                     500
                );
              // this.marker._component.animateMarkerToCoordinate(
              //   newCoordinate,
              //   500
              // );
            }
          } else {
            coordinate.timing(newCoordinate).start();
          }
  
          this.setState({
            latitude,
            longitude,
            routeCoordinates: routeCoordinates.concat([newCoordinate]),
            distanceBetween: this.calcCrow(),
           target: this.detectDestination(),
            distanceTravelled:
              distanceTravelled + this.calcDistance(newCoordinate),
            prevLatLng: newCoordinate
          });
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
         this.setState({
           latitude: position.coords.latitude,
           longitude: position.coords.longitude,
           error: null,
         });
         this.mergeLot();
       },
       (error) => this.setState({ error: error.message }),
       { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
     );
   }

  //in future need to separate in function
  detectDestination(){
    console.log(this.state.distanceBetween)
    console.log("distance entre")
    if(this.state.distanceBetween == 332){
      Alert.alert(
        'Vous êtes arrivés'
    )
    }
  };

  //Caculate distance
  calcCrow(){
    if ((this.state.latitude == this.state.markers[0].latitude) && (this.state.longitude == this.state.markers[0].longitude)) {
      return 0;
    }
    else {
      var unit = 'K'
      var radlat1 = Math.PI * this.state.latitude/180;
      var radlat2 = Math.PI * this.state.markers[0].latitude/180;
      var theta = this.state.longitude-this.state.markers[0].longitude;
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
      if(dist.toFixed(2) < 0.30){
        Alert.alert(
          'Vous êtes arrivés'
      )
        }
      return dist.toFixed(2);
    }
  };

//Harversine
  mergeLot(){
    if (this.state.latitude != null && this.state.longitude!=null)  
     {
       let concatLot = this.state.latitude +","+this.state.longitude
       this.setState({
         concat: concatLot
       }, () => {
         this.getDirections(concatLot, this.state.markers[0].latitude+","+this.state.markers[0].longitude);
       });
     }
   }

   calcDistance = newLatLng => {
    const { prevLatLng } = this.state;
    return haversine(prevLatLng, newLatLng) || 0;
  };

  //Get direction between 2 pins
   async getDirections(startLoc, destinationLoc) {
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
             this.setState({coords: coords})
             this.setState({x: "true"})
             console.log(coords)
             return coords
         } catch(error) {
           console.log('passe')
             this.setState({x: "error"})
             return error
         }
     }

     //Map region with autoupdate 
     getMapRegion = () => ({
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      });
      findCurrentLocation = () =>{
        navigator.geolocation.getCurrentPosition(
            position => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                this.setState({
                    latitude,
                    longitude
                });
            },
            { enableHighAccuracy: true , timeout: 20000, maximumAge: 1000 }
        );
          };
  
  render() {

    return (
        <View style={styles.container}>
        <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showUserLocation
        followUserLocation
        loadingEnabled
        region={this.getMapRegion()}
      >
          <Polyline coordinates={this.state.routeCoordinates} strokeWidth={5} />

      {!!this.state.latitude && !!this.state.longitude && <MapView.Marker
         coordinate={{"latitude":this.state.latitude,"longitude":this.state.longitude}}
         title={"Your Location"}
       />}

       {!!this.state.cordLatitude && !!this.state.cordLongitude && <MapView.Marker
          coordinate={{"latitude":this.state.markers[0].latitude,"longitude":this.state.markers[0].longitude}}
          title={"Your Destination"}
        />}

       {!!this.state.latitude && !!this.state.longitude && this.state.x == 'true' && <MapView.Polyline
            coordinates={this.state.coords}
            strokeWidth={2}
            strokeColor="red"/>
        }

        {!!this.state.latitude && !!this.state.longitude && this.state.x == 'error' && <MapView.Polyline
          coordinates={[
              {latitude: this.state.latitude, longitude: this.state.longitude},
              {latitude: this.state.markers[0].latitude, longitude: this.state.markers[0].longitude},
          ]}
          strokeWidth={2}
          strokeColor="red"/>
         }
      </MapView>
      <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.bubble, styles.button]}>
            <Text style={styles.bottomBarContent}>
              Parcouru {parseFloat(this.state.distanceTravelled).toFixed(2)} km
            </Text>
            <Text style={styles.bottomBarContent}>
              Il reste {this.state.distanceBetween} km
            </Text>
          </TouchableOpacity>
        </View>
    </View>
    );
  }
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