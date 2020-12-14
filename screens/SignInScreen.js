import React, { PureComponent, useContext,createContext,useEffect,useState } from 'react'
import { AsyncStorage, View,Text,TextInput,Button,StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux'
import AuthContext from '../AuthContext';
import { useSelector } from 'react-redux'
import { api, loadAuthorisationHeader } from "../helpers/axios";


const SignInScreen = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const test = useSelector(state => state.auth)

  const login = (email,password) => {
    console.log(email)
    console.log(password)
    dispatch({type:"LOADING"})
    api
          .post("/login", {
            email:email,
            password: password
          })
          .then(res => {
            console.log("this is the res")
            console.log(res.data.token);
            if (res.data.token != undefined) {
              AsyncStorage.setItem("password",password)
              AsyncStorage.setItem("email",email)
              api
              .get(`/api/user/me`, loadAuthorisationHeader(res.data.token))
              .then(resuser => {

                dispatch({type:"LOGIN",payload:{email:email,password:password,id:resuser.data.id,token:res.data.token}})                // console.log(res.data)
                let trips = res.data.trips
                console.log("work here")
                console.log(trips)
                dispatch({type:"SET_USER",payload:{trips}})
                dispatch({type:"END_LOADING"})
                })
              .catch(err => console.log(err));
          }
        }).catch(err =>{
          dispatch({type:"END_LOADING"})
          console.log("kkk")
          console.log(err)
        })
  }
  return (
    <View style={styles.container}>
      <Text style={styles.intro}>
        Bienvenue sur MyLittleParcours ,une application qui va vous permettre d'enregistrer vos parcours et de les réaliser ensuite grâce à notre système de géolocalisation .
      </Text>
      <TextInput
        style={styles.input}
        placeholder="email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Sign in" onPress={() => login(email,password) } />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:70,
  },
  intro:{
    textAlign:"center",
    backgroundColor:"#23EDD8",
    padding:5,
    fontSize:17,
    borderWidth:3,
    borderColor:"#0988EB",
    marginRight:50,
    marginLeft:50
  },
  input: {
    padding:5,
    margin: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1
 },
})

export default SignInScreen;