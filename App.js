import React, { Component, createContext,useReducer,useEffect, useMemo } from 'react';
import { AsyncStorage, View,Text,TextInput,Button } from 'react-native';
import SignInScreen from './screens/SignInScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import TripScreen from './screens/TripScreen'
import AuthContext from './AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { api, loadAuthorisationHeader } from "./helpers/axios";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
import { useDispatch } from 'react-redux'

import { useSelector } from 'react-redux'
export default function App({ navigation }) {
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()
  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
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
      }

    }).catch(err =>{
      console.log("kkk")
      console.log(err)
    })
  }
  })
}).catch(err =>{
  console.log("kkk")
  console.log(err)
})
  }, []);

  useEffect(() => {
console.log(auth)

  }, [auth]);

  // const authContext = useMemo(
  //   () => ({
  //     signIn: async ({email,password}) => {
  //       console.log(email)
  //       api
  //     .post("/login", {
  //       email:email,
  //       password: password
  //     })
  //     .then(res => {
  //       console.log("this is the res")
  //       console.log(res.data.token);
  //       if (res.data.token != undefined) {
  //         AsyncStorage.setItem( "userToken", res.data.token)
  //         dispatch({ type: 'SIGN_IN', token: res.data.token });
  //       } else {
  //         alert(
  //           "Vous n'avez pas rentré un password et un email valide veuillez réessayer"
  //         );
  //       }
  //     })
  //     .catch(err =>{
  //       console.log(err)
  //     })
  //       // In a production app, we need to send some data (usually username, password) to server and get a token
  //       // We will also need to handle errors if sign in failed
  //       // After getting token, we need to persist the token using `AsyncStorage`
  //       // In the example, we'll use a dummy token

        
  //       // await AsyncStorage.setItem( "userToken", "dummy-auth-token")
  //       // AsyncStorage.getItem('userToken').then((res)=>{
  //       //   console.log("lkjfnkjnerz")
  //       //   console.log(res)
  //       // })
  //     },
  //     register: async data => {
  //       console.log(data)
  //     },
  //     signOut: () => dispatch({ type: 'SIGN_OUT' }),
  //     signUp: async data => {
  //       console.log(data)
  //       // In a production app, we need to send user data to server and get a token
  //       // We will also need to handle errors if sign up failed
  //       // After getting token, we need to persist the token using `AsyncStorage`
  //       // In the example, we'll use a dummy token

  //       dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
  //       console.log(await AsyncStorage.getItem('userToken'))

  //     },
  //   }),
  //   []
  // );
  
  return (
    <>
        {auth.token == null ? (
          (<SignInScreen/>)
        ):(
          <NavigationContainer>
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
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Trip" component={TripScreen} />
          </Tab.Navigator>
        </NavigationContainer>
        )}
      </>

  );
};