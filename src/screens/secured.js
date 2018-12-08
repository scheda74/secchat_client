import React, { Component } from 'react';
import {
	ScrollView,
	Text,
	View,
    Button,
    FlatList,
    StyleSheet
} from 'react-native';
import { ListItem } from 'react-native-elements';


export default class Secured extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { user: '', availableUsers: null, msg_enc: '', msg_dec: '', sender: '', receiver: '', token: '' };
    }

    _getMsg = (token) => {
        //console.log(token);
        fetch(Environment.CLIENT_API+"/chats", {
            method: "GET",
            headers: {
                'x-access-token': token
            }
        })
        .then((response) => response.json())
        .then((response) => {
            if (response.success==true) {
                proceed = true;
                this.setState({ msg_enc: response.msg_enc });
                for(val in response.msg_enc) console.log(val);
            }
            else this.setState({ msg_enc: response.msg_enc });
        })
        .catch(err => {
            this.setState({ msg_enc: err.message });
        });
    }

    _getAvailableUsers = (token) => {
        fetch(Environment.CLIENT_API+"/chats/users", {
            method: "GET",
            headers: {
                'x-access-token': token
            }
        })
        .then((response) => response.json())
        .then((response) => {
            if (response.success==true) {
                proceed = true;
                this.setState({ availableUsers: response.available });
                //console.log(response.available);
            }
            else this.setState({ msg_enc: response.msg_enc });
        })
        .catch(err => {
            this.setState({ msg_enc: err.message });
        });    
    }

    _sendMsg = (token) => {
        var params = {
            sender: ''
        };
        var formBody = [];
        fetch(Environment.CLIENT_API+"/chats", {
            method: "POST",
            headers: {
                'x-access-token': token
            }
        })
        .then((response) => response.json())
        .then((response) => {
            if (response.success==true) {
                proceed = true;
                this.setState({ msg_enc: response.msg_enc });
            }
            else this.setState({ msg_enc: response.msg_enc });
        })
        .catch(err => {
            this.setState({ msg_enc: err.message });
        });
    }
    componentDidMount() {
        const { navigation } = this.props;
        const token = navigation.getParam('token', 'NO-TOKEN');
        const user = navigation.getParam('user', 'NO-USER');
        this.setState({user: user, token: token})
        this._getAvailableUsers(token);
        //console.log(this.state.availableUsers);
    }
    
	render() { 
        
        //this._getAvailableUsers(token);
        // console.log(user);
        //this.setState({token: token});
		return (
			<ScrollView style={{padding: 20}}>
				<Text 
					style={{fontSize: 27}}>
					Welcome {this.state.user.username}
				</Text>
                <Text
                    style={{fontSize: 27}}>
                    {this.state.token}
                </Text>
				<View style={{margin:20}} />
                <Button 
                    onPress={() => this._getMsg(this.state.token)}
                    title="Get chats"
                />
                {!!this.state.msg_enc && (
					<Text
						style={{fontSize: 14, color: 'red', padding: 5}}>
						{this.state.msg_enc}
					</Text>
                )}
                <View style={styles.container}>
                    <FlatList
                        data={this.state.availableUsers}
                        renderItem={({ item }) => (
                            <ListItem
                                title={`${item.username}`}
                                subtitle={item.email}/>
                        )}
                    />
                </View>
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
const Row = (user) => (
    <View style={styles.container}>
      {/* <Image source={{ uri: props.picture.large}} style={styles.photo} /> */}
      <Text style={styles.text}>
        {`${user.username} ${user.email}`}
      </Text>
    </View>
  );

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