import * as React from 'react';
import App from './App'
import { AsyncStorage, View,Text } from 'react-native';
import SignInScreen from './screens/SignInScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
const AuthContext = React.createContext();
const Stack = createStackNavigator();
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import mystore from './store/index';

const store = createStore(mystore);


export default function SuperApp() {
  return(
    <Provider store={store}>
      <App />
    </Provider>
  )

}