import LoadScreen from '../LoadScreen';
import React, { Component,useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import Direction from './index';


const PreMap = ({navigation}) => {
  const currentTrip = useSelector(state => state.currentTrip)
  const [loading, setLoading] = useState(true);
  const [error, seterror] = useState(false);
  useEffect(()=>{
    if(currentTrip.trip!==null){
    setLoading(false)
    }else{
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