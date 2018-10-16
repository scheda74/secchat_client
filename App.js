import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, AppRegistry } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: 'Type message here...' };
    this.input = React.createRef();
    //this.focusTextInput = this.input.current.focus();
  }

  encryptMsg(text) {
    console.log(text);
  }

  handleClick() {
    console.log("Button works!");
    this.setState
    //console.log(this.state.text.value);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>This is SecChat which doesn't work!</Text>
        <TextInput
            style={{height: 40, width: 150, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
          />
        <View style={styles.form}>
          <Button title="Encrypt" onPress={this.handleClick}/>
        </View>
        <View style={styles.form} >
          <Button title="Decrypt" onPress={this.handleClick}/>
        </View>
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
  form: {
    height: 40, 
    width: 80, 
    borderColor: 'gray', 
    borderWidth: 1
  },
  btn: {
    height: 40, 
    width: 80, 
    borderColor: 'gray', 
    borderWidth: 1,
    backgroundColor: 'gray'
  }
});
