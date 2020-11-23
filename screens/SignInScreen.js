import React, { PureComponent, useContext,createContext,useEffect } from 'react'
import { AsyncStorage, View,Text,TextInput,Button,StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux'
import AuthContext from '../AuthContext';
import { useSelector } from 'react-redux'
import { api, loadAuthorisationHeader } from "../helpers/axios";


const SignInScreen = (props) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const dispatch = useDispatch()
  const test = useSelector(state => state.auth)

  useEffect(() => {
    // console.log(test)
    // Fetch the token from storage then navigate to our appropriate place
//     AsyncStorage.getItem('email').then(email => {
//       AsyncStorage.getItem('password').then(password => {
//         if(email !== null && password!==null){
//         api
//       .post("/login", {
//         email:email,
//         password: password
//       })
//       .then(res => {
//         console.log("this is the res")
//         console.log(res.data.token);
//         if (res.data.token != undefined) {
//           store.actions.setToken(res.data.token)
//       }

//     }).catch(err =>{
//       console.log("kkk")
//       console.log(err)
//     })
//   }
//   })
// }).catch(err =>{
//   console.log("kkk")
//   console.log(err)
// })

  }, []);
  const login = (email,password) => {
    console.log(email)
    console.log(password)
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
          }
        }).catch(err =>{
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