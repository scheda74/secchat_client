import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, AppRegistry } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';


import Login from './login';
import Secured from './secured';
import SignUp from './signup';

const crypt = require('../crypt');


export default class Home extends React.Component {
    constructor(props) {
      super(props);
      this.state = { msg: '', enc: '', dec: '', token: '' };
    }
  
    userState = {
      isLoggedIn: false
    }
    
    
   
    updateValue(text) {
      this.setState({
        msg: text,
        enc: text,
        dec: ''
      });
    }
  
    handleClick() {
      var encrypted = crypt.encryptMsg(this.state.msg);
      var decrypted = crypt.decryptMsg(encrypted);
  
      var cipher = encrypted.cipher;
      this.setState({
        msg: this.state.msg,
        enc: cipher,
        dec: decrypted
      });
      //console.log(JSON.stringify(encrypted));
    }
  
    
  
    
  
    render() {
      // return (
      //   <View style={styles.container}>
      //     <Text>This is SecChat which doesn't work!</Text>
      //     <Text>Message: {this.state.enc} </Text>
      //     <Text>Decrypted: {this.state.dec} </Text>
      //     <TextInput
      //         placeholder="Type your message here..."
      //         style={{height: 40, width: 150, borderColor: 'gray', borderWidth: 1}}
      //         onChangeText={(text) => this.updateValue(text)}
      //         value={this.state.msg}
      //     />
      //     <View style={styles.form}>
      //       <Button title="Encrypt" onPress={this.handleClick.bind(this)}/>
      //     </View>
      //   </View>
      // );
      if (this.state.isLoggedIn) 
        return <View style={styles.container}>
          <Secured 
            onLogoutPress={() => this.setState({isLoggedIn: false})}
          />;
        </View>
      else 
        return (
        <View style={styles.container}>
          <Login 
              onLoginPress={() => this.setState({isLoggedIn: true})}
            />
        </View>
        );
    };
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
      borderWidth: 1,
      backgroundColor: 'skyblue'
    }
  });