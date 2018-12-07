import React, { Component } from 'react';
import {
	ScrollView,
	Text,
	View,
	Button
} from 'react-native';


export default class Secured extends Component {
    constructor(props) {
        super(props);
        this.state = { msg: '', enc: '', dec: '', token: '' };
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