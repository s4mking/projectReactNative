import React, { PureComponent, useContext,createContext,useEffect,useState } from 'react'
import { AsyncStorage, View,Text,TextInput,Button,StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux'
import AuthContext from '../AuthContext';
import { useSelector } from 'react-redux'
import { api, loadAuthorisationHeader } from "../helpers/axios";


const SignInScreen = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch()
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
              dispatch({type:"LOGIN",payload:{email:email,password:password,token:res.data.token}})
              AsyncStorage.setItem("password",password)
              AsyncStorage.setItem("email",email)
              api
              .get(`/api/user/me`, loadAuthorisationHeader(res.data.token))
              .then(res => {
                // console.log(res.data)
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
      <TextInput
        style={styles.input}
        placeholder="email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Sign in" onPress={() => login(email,password) } />
      <Button title="Register" onPress={() => null }/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  input: {
    marginTop: 50
  },
})

export default SignInScreen;