import React from 'react';
import { StyleSheet,View,Text } from 'react-native';
import AnimatedLoader from "react-native-animated-loader";

export default class LoadScreen extends React.Component {
  render() {
    return (
      // <View>
      //   <Text>
      //     lll;l;l
      //   </Text>
      // </View>
      <AnimatedLoader
        visible={true}
        overlayColor="rgba(255,255,255,0.75)"
        source={require("./map.json")}
        animationStyle={styles.lottie}
        speed={1}
      />
    );
  }
}

const styles = StyleSheet.create({
  lottie: {
    width: 200,
    height: 200
  }
});