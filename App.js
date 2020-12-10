import React, { Component, createContext,useReducer,useEffect, useMemo } from 'react';
import { AsyncStorage, View,Text,TextInput,Button,StyleSheet } from 'react-native';
import SignInScreen from './screens/SignInScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoadScreen from './screens/LoadScreen';
import HomeScreen from './screens/HomeScreen';
import TripScreen from './screens/TripScreen'
import Direction from './screens/Direction';

import AuthContext from './AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { api, loadAuthorisationHeader } from "./helpers/axios";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
import { useDispatch } from 'react-redux'

import { useSelector } from 'react-redux'
export default function App({ navigation }) {
  const auth = useSelector(state => state.auth)
  const loading = useSelector(state => state.loading)
  
  const dispatch = useDispatch()
  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    dispatch({type:"LOADING"})
    AsyncStorage.getItem('email').then(email => {
      AsyncStorage.getItem('password').then(password => {
        if(email !== null && password!==null){
          api
          .post("/login", {
          email:email,
          password: password
          })
          .then(res => {
            console.log("this is the res")
            console.log(res.data.token);
            if (res.data.token != undefined) {
              dispatch({type:"LOGIN",payload:{email:email,password:password,token:res.data.token}})
              api
              .get(`/api/user/me`, loadAuthorisationHeader(res.data.token))
              .then(res => {
                console.log(res.data)
                let trips = res.data.trips
                console.log("work here")
                console.log(trips)
                dispatch({type:"SET_USER",payload:{trips}})
                setTimeout(() => {
                dispatch({type:"END_LOADING"})

                }, 100);
                })
              .catch(err => console.log(err));
            }
          })
          .catch(err =>{
          console.log(err)
          })
        }
      })
    }).catch(err =>{
      console.log(err)
      })
    }, []);

  useEffect(() => {
    console.log(loading)
  },[loading])
  
  return (
    <>
    {loading.status ?
    <LoadScreen />
    : auth.token == null ? 
      (<SignInScreen/>):
      (
          <NavigationContainer>
            <View style={styles.logout}>
              <Ionicons name={'ios-log-out'} style={{zIndex: 100000,marginTop:30,marginLeft:20}} color={'gray'} size={50} />
            </View>
          <Tab.Navigator
          
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
    
                if (route.name === 'Home') {
                  iconName = focused
                    ? 'ios-map'
                    : 'ios-home';
                } else if (route.name === 'Trip') {
                  iconName = focused ? 'ios-list-box' : 'ios-list';
                }else if (route.name === 'Add') {
                  iconName = focused ? 'ios-add-circle' : 'ios-add-circle-outline';
                }
                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
            tabBarOptions={{
              activeTintColor: 'tomato',
              inactiveTintColor: 'gray',
            }}
          >
            <Tab.Screen name="Home" component={Direction} />
            <Tab.Screen name="Trip" component={TripScreen} />
            <Tab.Screen name="Add" component={Direction} />
          </Tab.Navigator>
        </NavigationContainer>
        )
      }
      </>
  );
};



const styles = StyleSheet.create({
  logout: {
    position: 'relative',
    width:500,
    height:80,
    zIndex: 100,
    backgroundColor: "#f2f2f2",
  }
});