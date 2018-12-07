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

    _getMsg = (token) => {
        //console.log(token);
        fetch(Environment.CLIENT_API+"/chats", {
            method: "POST",
            headers: {
                'Authorization': token
            }
        })
        .then((response) => {
            console.log(response.json());
            response.json();
        })
        .then((response) => {
            if (response.success==true) {
                proceed = true;
                this.setState({ msg_enc: response.enc });
                console.log(response.enc);
            }
            else this.setState({ msg_enc: response.message });
        })
        .catch(err => {
            this.setState({ msg_enc: err.message });
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
                    onPress={() => this._getMsg(token)}
                    title="Get chats"
                />
                {!!this.state.msg_enc && (
					<Text
						style={{fontSize: 14, color: 'red', padding: 5}}>
						{this.state.msg_enc}
					</Text>
				)}
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