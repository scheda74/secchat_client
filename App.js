import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
// import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: 'My Secchat' };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>This is SecChat which doesn't work!</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />

        {/* <FormLabel>Type in message you'd like to encrypt</FormLabel>
        <FormInput 
          ref={input => console.log(input)}
        />
        <FormValidationMessage>Error message</FormValidationMessage>
        <Button onPress={encryptMsg}>Submit</Button> */}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
