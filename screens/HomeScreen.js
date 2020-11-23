
import React, { PureComponent, useEffect } from 'react'
import { AsyncStorage, View,Text,TextInput,Button } from 'react-native';
import { useSelector } from 'react-redux'
import { api, loadAuthorisationHeader } from "../helpers/axios";

const HomeScreen = () => {
  const auth = useSelector(state => state.auth)
  useEffect(() => {
    api
      .get(`/api/user/me`, loadAuthorisationHeader(auth.token))
      .then(res => {
        console.log(res.data)
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