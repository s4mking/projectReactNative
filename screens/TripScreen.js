
import React, { PureComponent, useEffect } from 'react'
import { AsyncStorage, View,Text,TextInput,Button } from 'react-native';

const TripScreen = () => {
  
  useEffect(() => {
    AsyncStorage.getItem('userToken').then((res)=>{
      console.log(res)
    })
  }, []);
  return ( 
    <View>
      <Button onPress={() => AsyncStorage.removeItem('userToken')}>logout</Button>
      <Text>Hi it is the tripscreen</Text>
    </View>
  );
};

export default TripScreen;