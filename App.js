import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, AppRegistry } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import Login from './src/screens/login';
import Secured from './src/screens/secured';
import SignUp from './src/screens/signup';
import Home from './src/screens/home';
import Chat from './src/screens/chat';

const crypt = require('./src/crypt');


const RootStack = createStackNavigator(
  {
    Home: {screen: Home},
    Login: {screen: Login},
    Main: {screen: Secured},
    SignUp: {screen: SignUp},
    Chat: {screen: Chat}
  },
  {
    initialRouteName: "Login"
  }
);

const AppContainer = createAppContainer(RootStack);
export default AppContainer;