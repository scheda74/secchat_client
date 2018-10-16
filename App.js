import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, AppRegistry } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import {Crypt, keyManager, RSA} from 'hybrid-crypto-js';

 // crypto credit: https://www.npmjs.com/package/hybrid-crypto-js

var entropy = "aflasdflkjh2340asfdlkvbafewafsdfasdlkfjhasdfbvqlwef01247";
var crypt = new Crypt({entropy: entropy});
var rsa = new RSA({entropy: entropy});


var publicKey = "-----BEGIN PUBLIC KEY-----MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAxp0hg/pPmeqNQA4nwXkFp84EIpKQbdJMgI41wYxaK5masKUN1Vn/qxfdEPpzOVtoBx6Aas5Zkxg+skNWjFdFVnukncbHK7hIFzy8jmwSr8iDFspxb/1wzJbXisgHH0aG81wDRbzXIdJoaW25JA4lwMP538f7qPG0dr3eGBdidYbhKU/tWTZns0aRjcWadCTRUDW7ge3RwtRhq5TSjm79lr4kpLXWW3lNbOX4xksfp/Uusy7hyGW9MdX1q7GHxJDiSu5l839VnwlNGbM16oxyS6JjRVi9xBBZojAcswFxxwN2mTXb1MFMf/iq13wUl3iG5K5B/9P6IMWJ6ko6yF8hJE+nJOOSOxigIidu36yM/QDhn7yZN50gfDJ/mO9+d0qZklY4igHq/E3YskNUlQuZ80ITjG/lyuKWYLh1WyFOeuXT7PJNscx+ITCUkR9x70yvmEH07nTuynZTOeJ6grEyWeXXmbRl99Rf5eouaOk2rsHDaeAT6sp4Tg97qQ8vBWOot0VmDWxHpwd4ggZ4113YD5dUej873iUpGtvytmjXB3S0LDdRiP5MvgusuZdDxWfkqcKLnCJuEv/plEbPoI8v8LbUK+YL8RlSOQg+R1AbEIcqRMhQ84s2ojnQRX+ttHHJPgTGcceNjWrqAKcg0inbpDYzTERt9gPwbA/qss6XkkkCAwEAAQ==-----END PUBLIC KEY-----";
var privateKey = "-----BEGIN RSA PRIVATE KEY-----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-----END RSA PRIVATE KEY-----"
// rsa.generateKeypair(function(keypair) {
 
//   // Callback function receives new keypair as a first argument
//   console.log("this is working..");
//   var publicKey = keypair.publicKey;
//   var privateKey = keypair.privateKey;
// });
// Get device specific RSA key pair
// keyManager.getKeys(function(keypair) {
//   // Callback function receives new keypair as a first argument
//   var publicKey = keypair.publicKey;
//   var privateKey = keypair.privateKey;
// });

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { enc: '', dec: '' };
    this.input = React.createRef();
    //this.focusTextInput = this.input.current.focus();
    
  }
  
  
 
  updateValue(text) {
    this.setState({
      enc: text,
      dec: ''
    });
  }

  handleClick() {
    var encrypted = crypt.encrypt(publicKey, this.state.enc);
    var decrypted = crypt.decrypt(privateKey, encrypted);
    this.setState({
      enc: encrypted.cipher,
      dec: decrypted.message
    });
    console.log(JSON.stringify(encrypted));
    //console.log(this.state.text.value);
  }

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
            value={this.state.enc}
        />
        <View style={styles.form}>
          <Button title="Encrypt" onPress={this.handleClick.bind(this)}/>
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
    borderWidth: 1,
    backgroundColor: 'skyblue'
  }
});
