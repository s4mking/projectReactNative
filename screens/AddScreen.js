import React from 'react';
import { StyleSheet,View,Text } from 'react-native';
import AnimatedLoader from "react-native-animated-loader";
import Icon from 'react-native-vector-icons/FontAwesome';


export default class LoadScreen extends React.Component {
  render() {
    return (
      // <View>
      //   <Text>
      //     lll;l;l
      //   </Text>
      // </View>
      <View>
      <AnimatedLoader
        visible={true}
        overlayColor="rgba(255,255,255,0.75)"
        source={require("./pin2.json")}
        animationStyle={styles.lottie}
        speed={1}
      />
       <Icon.Button name="facebook" backgroundColor="#3b5998">
    <Text style={{ fontSize: 15 }}>
      Login with Facebook
    </Text>
  </Icon.Button>
      </View>
     
    );
  }
}

const styles = StyleSheet.create({
  lottie: {
    width: 200,
    height: 200
  }
});


useEffect(() => {
  console.log(loading)
},[loading])