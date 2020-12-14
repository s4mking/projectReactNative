import LoadScreen from '../LoadScreen';
import React, { Component,useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import Direction from './index';


const PreMap = ({navigation}) => {
  const currentTrip = useSelector(state => state.currentTrip)
  const [loading, setLoading] = useState(true);
  const [error, seterror] = useState(false);
  useEffect(()=>{
    console.log(currentTrip)
    console.log(navigation)
    console.log("daniel test here")
    if(currentTrip.trip!==null){
    console.log(currentTrip.trip.step[currentTrip.indexLoc])
    setLoading(false)
    }else{
      console.log("here big error")
      console.log(navigation)
      seterror(true)
      // setLoading(false)
      // navigation.navigate('Trip')
      // setLoading(false)
    }
  },[])
  useEffect(()=>{
    if(error==true){
      navigation.navigate('Trip')
    }
  },[error])

  useEffect(()=>{
    console.log("i try to see if present")
    if(currentTrip.trip !== null){
      setLoading(false)
    }
  },[currentTrip])

  return(
    <> 
    {loading ? 
    <LoadScreen /> :
    <Direction />
    }
    </>
  )
};

export default PreMap;