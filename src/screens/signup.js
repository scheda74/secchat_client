import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import {
    ScrollView,
    Text,
    TextInput,
    View,
    Button,
    Alert,
    StyleSheet,
    ActivityIndicator
} from 'react-native';

import Environment from '../config/environment';

export default class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.render = this.render.bind(this);
    }

    state = {
        name: '',
        user: null,
        password: '',
        isLoggingIn: false,
        message: '',
        token: ''
    }

    _userLogin = () => {

        this.setState({ isLoggingIn: true, message: '' });

        var params = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            grant_type: 'password'
        };

        var formBody = [];
        for (var property in params) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(params[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        var proceed = false;
        fetch(Environment.CLIENT_API+"/signup", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formBody
            })
            .then((response) => response.json())
            .then((response) => {
                if (response.success==true) {
                    proceed = true;
                    this.setState({ token: response.token, user: response.user });
                    // console.log(response.token);
                }
                else this.setState({ message: response.message, user: response.user });
            })
            .then(() => {
                this.setState({ isLoggingIn: false })
                if (proceed) this.props.navigation.navigate('Main', {
                    token: this.state.token,
                    user: this.state.user
                });
            })
            .catch(err => {
				this.setState({ message: err.message });
				this.setState({ isLoggingIn: false })
			});
    }

    clearName = () => {
        this._name.setNativeProps({ text: '' });
        this.setState({ message: '' });
    }

    clearMail = () => {
        this._email.setNativeProps({ text: '' });
        this.setState({ message: '' });
    }

    clearPassword = () => {
        this._password.setNativeProps({ text: '' });
        this.setState({ message: '' });
    }
    
    render() { 
        return (
            <ScrollView contentContainerStyle={styles.container}>
				<Text 
					style={{fontSize: 27}}>
					Sign Up
				</Text>
                <TextInput
					ref={component => this._name = component}
					placeholder='Username' 
					onChangeText={(name) => this.setState({name})}
                    autoFocus={true}
                    autoCapitalize="none"
					onFocus={this.clearName}
				/>
				<TextInput
					ref={component => this._email = component}
					placeholder='Email' 
					onChangeText={(email) => this.setState({email})}
                    autoFocus={true}
                    autoCapitalize="none"
					onFocus={this.clearMail}
				/>
				<TextInput 
					ref={component => this._password = component}
					placeholder='Password' 
					onChangeText={(password) => this.setState({password})}
					secureTextEntry={true}
                    onFocus={this.clearPassword}
                    autoCapitalize='none'
					onSubmitEditing={this._userLogin}
				/>
				{!!this.state.message && (
					<Text
						style={{fontSize: 14, color: 'red', padding: 5}}>
						{this.state.message}
					</Text>
				)}
				{this.state.isLoggingIn && <ActivityIndicator />}
				<View style={{margin:7}} />
				<Button 
					disabled={this.state.isLoggingIn||!this.state.name||!this.state.password}
		      		onPress={this._userLogin}
		      		title="Submit"
		      	/>
	      </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
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