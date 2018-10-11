import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Input } from 'react-native-elements'


export default class App extends React.Component {
  render() {
    encryptMsg
    return (
      <View style={styles.container}>
        <Text>This is SecChat which doesn't work!</Text>
        <FormLabel>Type in message you'd like to encrypt</FormLabel>
        <FormInput onChangeText={encryptMsg}/>
        <FormValidationMessage>Error message</FormValidationMessage>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
