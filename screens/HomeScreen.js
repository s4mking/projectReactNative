
import React, { PureComponent, useEffect,useState } from 'react'
import { AsyncStorage, View,Text,TextInput,Button } from 'react-native';
import { useSelector } from 'react-redux'
import { api, loadAuthorisationHeader } from "../helpers/axios";
const HomeScreen = () => {
  const auth = useSelector(state => state.auth)
  const [user,setUser] = useState(null)
  useEffect(() => {
    api
      .get(`/api/user/me`, loadAuthorisationHeader(auth.token))
      .then(res => {
        setUser(res.data)
    })
    .catch(err => console.log(err));
  }, []);
  return (
    <View>
      <Text>Hi it is the homejjpage</Text>
    </View>
  );
};

export default HomeScreen;