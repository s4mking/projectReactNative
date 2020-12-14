import React, {useEffect,useState} from 'react';
import { StyleSheet,View,Text } from 'react-native';
import AnimatedLoader from "react-native-animated-loader";
import Icon from 'react-native-vector-icons/FontAwesome';

const LoadScreen = () => {
  const [loader, setLoader] = useState(undefined);
  useEffect(() => {
    var req = require(`./pin.json`)
    var req2 = require(`./pin2.json`)
    var req3 = require(`./map.json`)
    const loaderPossible = [req,req2,req3];
     setLoader(loaderPossible[Math.floor(Math.random() * loaderPossible.length)])
  }, []);

    return (
      <View>
        {loader ?  <AnimatedLoader
         visible={true}
         overlayColor="rgba(255,255,255,0.75)"
         source={loader}
         animationStyle={styles.lottie}
         speed={1}
       />  : null}
      </View>
     
    );
};

export default LoadScreen;

const styles = StyleSheet.create({
  lottie: {
    width: 200,
    height: 200
  }
});