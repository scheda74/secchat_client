import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, AppRegistry } from 'react-native';

export default class SignUp extends React.Component {
    render() {
        return (
          <View style={styles.container}>
            <Text>This is SecChat which doesn't work!</Text>
            <Text>Message: {this.state.enc} </Text>
            <Text>Decrypted: {this.state.dec} </Text>
            <TextInput
                placeholder="Type your message here..."
                style={{height: 40, width: 150, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(text) => this.updateValue(text)}
                value={this.state.msg}
            />
            <View style={styles.form}>
              <Button title="Encrypt" onPress={this.handleClick.bind(this)}/>
            </View>
          </View>
        );
      }
}