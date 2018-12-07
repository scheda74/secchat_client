import React, { Component } from 'react';
import {
	ScrollView,
	Text,
	View,
    Button,
    ListView
} from 'react-native';


export default class Secured extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { msg_enc: '', msg_dec: '', sender: '', receiver: '', token: '' };

    }

    _getMsg = () => {
        fetch(Environment.CLIENT_API+"/chats", {
            method: "POST",
            headers: {
                'x-access-token': this.token
            },
            body: formBody
        })
        .then((response) => response.json())
        .then((response) => {
            if (response.success==true) {
                proceed = true;
                this.setState({ token: response.token });
                // console.log(response.token);
            }
            else this.setState({ message: response.message });
        })
        .then(() => {
            this.setState({ isLoggingIn: false })
            if (proceed) this.props.navigation.navigate('Main', {
                token: this.state.token
            });
        })
        .catch(err => {
            this.setState({ message: err.message });
            this.setState({ isLoggingIn: false })
        });
    }
    
	render() { 
        const { navigation } = this.props;
        const token = navigation.getParam('token', 'NO-TOKEN');
        //this.setState({token: token});
		return (
			<ScrollView style={{padding: 20}}>
				<Text 
					style={{fontSize: 27}}>
					Welcome
				</Text>
                <Text
                    style={{fontSize: 27}}>
                    {token}
                </Text>
				<View style={{margin:20}} />
            
				<Button
		            onPress={() => {
                        this.setState({isLoggedIn: false});
                        this.props.navigation.navigate('Login');
                    }}
		            title="Logout"
		        />
		    </ScrollView>
        )
	}
}